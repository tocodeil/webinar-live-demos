from selenium import webdriver
import pytest

@pytest.fixture(scope='session', params=[webdriver.Chrome])
def browser(request):
    driver = request.param()
    driver.implicitly_wait(5)
    yield driver
    driver.close()
