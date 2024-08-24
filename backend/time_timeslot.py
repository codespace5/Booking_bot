import datetime

# Define the date and time
date_time_str = '2024-05-06 23:59:59'

# Convert the date and time string to a datetime object
date_time_obj = datetime.datetime.strptime(date_time_str, '%Y-%m-%d %H:%M:%S')

# Convert the datetime object to a Unix timestamp in milliseconds
timestamp_ms = int(date_time_obj.timestamp() * 1000)

print("Unix timestamp:", timestamp_ms)
