import csv
from datetime import datetime

def convert_date(date_str):
    date_obj = datetime.strptime(date_str, "%Y/%m/%d")
    return date_obj.strftime("%Y-%m-%dT%H:%M:%SZ")

# Column index of the date column (zero-based)
date_col_index = 5

with open("data.csv", "r") as input_file, open("output.csv", "w", newline="") as output_file:
    reader = csv.reader(input_file)
    writer = csv.writer(output_file)

    # Write the header row as-is
    header = next(reader)
    writer.writerow(header)

    # Iterate over each row in the input file
    for row in reader:
        # Replace date string in the specified column
        row[date_col_index] = convert_date(row[date_col_index])
        writer.writerow(row)

print("Date conversion completed successfully.")