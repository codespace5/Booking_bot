import datetime

timestamp_ms = 1719925200000  # Unix timestamp in milliseconds
timestamp_sec = timestamp_ms / 1000  # Convert milliseconds to seconds

# Convert Unix timestamp to datetime object
dt_object = datetime.datetime.fromtimestamp(timestamp_sec)

# Format datetime object as a string
formatted_time = dt_object.strftime('%Y-%m-%d %H:%M:%S')

print("Converted time:", formatted_time)
