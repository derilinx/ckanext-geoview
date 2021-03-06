from logging import getLogger
import urlparse

import requests

import ckan.logic as logic
import ckan.lib.base as base

import zipfile
import StringIO

log = getLogger(__name__)

MAX_FILE_SIZE = 3 * 1024 * 1024  # 1MB
CHUNK_SIZE = 512

def proxy_service_resource(self, context, data_dict):
    ''' Chunked proxy for resources. To make sure that the file is not too
    large, first, we try to get the content length from the headers.
    If the headers to not contain a content length (if it is a chinked
    response), we only transfer as long as the transferred data is less
    than the maximum file size. '''
    resource_id = data_dict['resource_id']
    log.info('Proxify resource {id}'.format(id=resource_id))
    resource = logic.get_action('resource_show')(context, {'id': resource_id})

    res_format = resource['format'].lower()

    unzip = False

    if 'wms' in res_format or 'wfs' in res_format:
        url = resource['url'].split('?')[0]
    elif 'kml' in res_format and '.kml.zip' in resource['url']:
        url = resource['url']
        unzip = True
    else:
        url = resource['url']

    return proxy_service_url(self, url, unzip=unzip)

def proxy_service_url(self, url, unzip=False):

    parts = urlparse.urlsplit(url)
    if not parts.scheme or not parts.netloc:
        base.abort(409, detail='Invalid URL.')

    try:
        req = self._py_object.request
        method = req.environ["REQUEST_METHOD"]

        url = url.split('#')[0] # remove potential fragment

        if method == "POST":
            length = int(req.environ["CONTENT_LENGTH"])
            headers = {"Content-Type": req.environ["CONTENT_TYPE"]}
            body = req.body
            r = requests.post(url, data=body, headers=headers, stream=True)
        else:
            r = requests.get(url, params=req.query_string, stream=True)

        #log.info('Request: {req}'.format(req=r.request.url))
        #log.info('Request Headers: {h}'.format(h=r.request.headers))

        cl = r.headers.get('content-length')
        if cl and int(cl) > MAX_FILE_SIZE:
            base.abort(413, ('''Dataset is too large to be previewed. Allowed
                file size: {allowed}, Content-Length: {actual}. Url: '''+url).format(
                allowed=MAX_FILE_SIZE, actual=cl))

        if unzip:
            base.response.content_type = 'application/xml'
            base.response.charset = 'utf-8'

            z = zipfile.ZipFile(StringIO.StringIO(r.content))
            base.response.body_file.write(z.read(z.namelist()[0]))
        else:
            base.response.content_type = r.headers['content-type']
            base.response.charset = r.encoding

            length = 0
            for chunk in r.iter_content(chunk_size=CHUNK_SIZE):
                base.response.body_file.write(chunk)
                length += len(chunk)

                if length >= MAX_FILE_SIZE:
                    base.abort(413, ('''Dataset is too large to be previewed. Allowed
                    file size: {allowed}, Content-Length: {actual}. Url: '''+url).format(
                        allowed=MAX_FILE_SIZE, actual=length))

    except requests.exceptions.HTTPError, error:
        details = 'Could not proxy resource. Server responded with %s %s' % (
            error.response.status_code, error.response.reason)
        base.abort(409, detail=details)
    except requests.exceptions.ConnectionError, error:
        details = '''Could not proxy resource because a
                            connection error occurred. %s''' % error
        base.abort(502, detail=details)
    except requests.exceptions.Timeout, error:
        details = 'Could not proxy resource because the connection timed out.'
        base.abort(504, detail=details)


class ServiceProxyController(base.BaseController):
    def proxy_service(self, resource_id):
        data_dict = {'resource_id': resource_id}
        context = {'model': base.model, 'session': base.model.Session,
                   'user': base.c.user or base.c.author}
        return proxy_service_resource(self, context, data_dict)

    def proxy_service_url(self, map_id):
        url = base.config.get('ckanext.spatial.common_map.'+map_id+'.url')
        return proxy_service_url(self, url)
