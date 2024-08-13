import csv
import json


def convert_value(key, value):
    """Convert string value based on the key."""
    if key == 'bye':
        return int(value)    # Convert to int if there's no decimal point
    return value


def csv_to_json(csv_file_path, json_file_path):
    data = []

    # Read the CSV file
    with open(csv_file_path, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        # Convert each row into a JSON object
        for row in csv_reader:
            converted_row = {key: convert_value(key, value) for key, value in row.items()}
            data.append(converted_row)    
    # Write the JSON file
    with open(json_file_path, mode='w') as json_file:
        json.dump(data, json_file, indent=4)


if __name__ == '__main__':
  csv_file_path = 'players.csv'  # Path to your CSV file
  json_file_path = 'players.json'  # Path to the output JSON file

  csv_to_json(csv_file_path, json_file_path)

  print(f'CSV data from {csv_file_path} has been converted to JSON and saved to {json_file_path}')    

