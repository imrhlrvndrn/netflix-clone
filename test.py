import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import pytest
from selenium.webdriver.chrome.options import Options

@pytest.fixture(scope="session")
def driver():
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--window-size=1920,1080')
    
    # Initialize the WebDriver without specifying the executable_path
    driver = webdriver.Chrome(options=chrome_options)
    
    yield driver
    driver.quit()

    
def test_search_movie(driver):
    driver.get("http://13.200.45.156:1111")
    
    # Find the search input element and enter the movie name
    driver.maximize_window()
    time.sleep(5)
    search_input = driver.find_element(By.NAME, "searchbar")
    search_input.send_keys("Kathal") 
    search_input.send_keys(Keys.RETURN)
    time.sleep(2)

    WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.CLASS_NAME, "searchResults_container")))

def test_hover_and_click(driver):
    # Find the first result's mediacard element
    first_mediacard = WebDriverWait(driver, 3).until(
        EC.presence_of_element_located((By.XPATH, "(//div[@class='searchResults_container']//div[@class='mediacard'])"))
    )

    # Perform a mouse hover over the mediacard to reveal the actions buttons
    ActionChains(driver).move_to_element(first_mediacard).perform()
    time.sleep(2)

    # Clicking to get More info
    more_info_xpath = ".//div[@class='searchResults_container']//div[@class='mediacard_info']//div[@class='action_buttons']//a[text()='More info']"
    more_info = driver.find_element(By.XPATH, more_info_xpath)
    more_info.click()
    time.sleep(2)    

def test_add_to_wishlist(driver):
    # Clicking to add wishlist button 
    driver.switch_to.window(driver.window_handles[1])
    button_xpath = ".//div[@id='root']//div[@class='detailedPage']//div[@class='detailedPage_banner']//div[@class='detailedPage_banner_content']//div[@class='detailedPage_banner_content_details']//button"
    button = driver.find_element(By.XPATH, button_xpath)
    button.click()
    time.sleep(3)

def test_check_wishlist(driver):
    # Check whether movie added to watchlist
    avatar_xpath=".//div[@id='root']//div[@class='nav']//img[@class='nav_avatar']"
    avatar=driver.find_element(By.XPATH, avatar_xpath)
    avatar.click()
    time.sleep(3)

def test_check_trailer(driver):
    # Check whether trailer is accessible 
    driver.back()
    WebDriverWait(driver, 3).until(
        EC.presence_of_element_located((By.TAG_NAME, "body"))
    )
    time.sleep(3)

    trailer_xpath = ".//div[@id='root']//div[@class='detailedPage']//div[@class='detailedPage_banner']//div[@class='detailedPage_banner_content']//div[@class='detailedPage_banner_content_poster_image']//a[@class='movie_trailer']"
    trailer = driver.find_element(By.XPATH, trailer_xpath)
    trailer.click()
    time.sleep(5)

def test_check_cast(driver):
    # Check for Cast
    driver.switch_to.window(driver.window_handles[2])
    driver.close()
    time.sleep(3)
    driver.switch_to.window(driver.window_handles[1])

    driver.execute_script("window.scrollBy(0,500)")
    time.sleep(3)

    cast = driver.find_element(By.XPATH,"//h1[text()='Cast']")
    cast.click()

def test_check_cast_information(driver):
    # Check for Cast Information
    person_xpath = ".//div[@id='root']//div[@class='detailedPage']//section[@class='detailedPage_mediaInfo']//div[@class='detailedPage_mediaInfo_left']//div[not(@class)]//div[@class='media_content']//div[@class='content']//a[@class='title']//h1"
    person = driver.find_element(By.XPATH, person_xpath)
    person.click()

    readmore_xpath = ".//div[@id='root']//div[@class='detailedPage']//div[@class='detailedPage_banner']//div[@class='detailedPage_banner_content']//div[@class='detailedPage_banner_content_details']//p[@class='overview_text']//button"

    try:
        readmore_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, readmore_xpath))
        )
        # Click the readmore element
        readmore_element.click()
        time.sleep(5)
    except:
        time.sleep(3)

def test_go_homepage(driver):
    # Go Homepage
    home_xpath=".//div[@id='root']//div[@class='nav']//a"
    home = driver.find_element(By.XPATH,home_xpath)
    home.click()

    time.sleep(3)
