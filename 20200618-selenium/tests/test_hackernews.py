

def test_hackernews_homepage_has_30_stories(browser):
    browser.get('https://news.ycombinator.com/')
    stories = browser.find_elements_by_css_selector('a.storylink')
    assert len(stories) == 30
# 