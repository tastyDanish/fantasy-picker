import csv

def convert_value(key, value):
    """Convert string value based on the key."""
    if key == 'Bye':
        try:
            # Convert to int if there's no decimal point, handle empty strings
            return int(value) if value.strip() else None
        except ValueError:
            return None
        except AttributeError:
            return None
    return value

def csv_to_csv(input_csv_file_path, output_csv_file_path):
    with open(input_csv_file_path, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        # Prepare to write to a new CSV file
        with open(output_csv_file_path, mode='w', newline='') as output_csv_file:
            fieldnames = ['name', 'team', 'bye', 'position']
            csv_writer = csv.DictWriter(output_csv_file, fieldnames=fieldnames)
            
            # Write the header
            csv_writer.writeheader()
            
            # Convert each row and write to the new CSV file
            for row in csv_reader:
                # Ensure 'POS' value is not None before calling replace
                position = row['POS'].replace('1', '') if row['POS'] else ''
                converted_row = {
                    'name': row['Player'],
                    'team': row['Team'],
                    'bye': convert_value('Bye', row['Bye']),
                    'position': position
                }
                csv_writer.writerow(converted_row)

if __name__ == '__main__':
    input_csv_file_path = 'latest-players.csv'  # Path to your input CSV file
    output_csv_file_path = 'processed-players.csv'  # Path to the output CSV file

    csv_to_csv(input_csv_file_path, output_csv_file_path)

    print(f'CSV data from {input_csv_file_path} has been processed and saved to {output_csv_file_path}')
