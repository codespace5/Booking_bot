import random

def generate_random_numbers():
    return random.randint(10000, 99999)

if __name__ == "__main__":
    random_numbers = generate_random_numbers()
    print("Random numbers:", random_numbers)