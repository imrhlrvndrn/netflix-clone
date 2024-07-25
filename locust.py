import random
from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):
    @task
    def search(self):
        # Simulate searching for content
        search_query = "The Matrix"  # Change this to your desired search query
        self.client.get(f"/search?query={search_query}")

    @task
    def view_cast(self):
        cast_id = random.randint(2222222, 9999999)
        self.client.get(f"/person/{cast_id}")  # Corrected URL formatting

    @task
    def movie_ui(self):
        random_movie_id = random.randint(10000, 99999)
          # Adjust the range as per your actual movie IDs
        self.client.get(f"/tv/{random_movie_id}")

    @task
    def watch_trailer(self):
        youtube_trailer_url = "https://www.youtube.com/watch?v=VIDEO_ID_HERE"  # Replace with the actual YouTube URL
        self.client.get(youtube_trailer_url)

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(5, 9)  # Random wait time between 5 and 9 seconds
