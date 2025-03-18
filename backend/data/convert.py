from openpyxl import load_workbook
import json

wb = load_workbook('teams.xlsx').active

field_map = ['first', 'last', 'position', 'born', 'year_signed', 'years', 'college', 'ppg', 'rpg', 'apg', 'fgpg', 'nickname', 'stock' ]

output_data = []

for row in wb['A2':'L200']:
    plaintext_row = [i.value for i in row]

    if len(row) == 0 or row[0].value is None:
        break

    # adjust year_signed to be 4 digits
    plaintext_row[5] += 2000 if plaintext_row[5] < 26 else 1900

    # Split nickname
    nickname = plaintext_row[0].split(' ', 1)
    plaintext_row[0] = plaintext_row[0].split(' ')[0]
    plaintext_row.append(nickname[1].replace('"', '') if len(nickname) > 1 else None)
    plaintext_row.append(True)

    del plaintext_row[3]

    output_data.append(dict(zip(field_map, plaintext_row)))

print(json.dumps(output_data, indent=2))
