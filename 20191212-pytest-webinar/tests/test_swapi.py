import requests, pytest

@pytest.fixture(scope='session')
def session():
    with requests.Session() as s:
        yield s


def test_luke(session):
    resp = session.get('https://swapi.co/api/people/1/')
    data = resp.json()
    assert data['name'] == "Luke Skywalker"


def test_lukes_height(session):
    resp = session.get('https://swapi.co/api/people/1/')
    data = resp.json()
    assert data['height'] == "172"