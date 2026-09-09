from ckanext.geoview import plugin


def test_plugin():
    """This is here just as a sanity test
    """
    p = plugin.OLGeoView()
    assert p


def test_alternate_formats_handles_missing_and_direct_formats():
    p = plugin.OLGeoView()

    assert p.alternate_formats({}) == {}
    assert p.alternate_formats({"alternate_formats": "{}"}) == {}
    assert p.alternate_formats({"alternate_formats": {"geojson": {"url": "https://example.com/file.geojson"}}}) == {
        "geojson": {"url": "https://example.com/file.geojson"}
    }

    p.proxy_enabled = True
    resource = {
        "format": "geojson",
        "url": "https://example.com/file.geojson",
        "alternate_formats": {},
    }
    assert p.can_view({"resource": resource}) is True