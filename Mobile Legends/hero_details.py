import requests
import json
import os

# Define the base URLs
hero_details_url = 'https://api.gms.moontontech.com/api/gms/source/2669606/2756564'
hero_winrate_url = 'https://api.gms.moontontech.com/api/gms/source/2669606/2756567'
hero_guide_url = 'https://api.gms.moontontech.com/api/gms/source/2669606/2674711'

# Create a main folder for hero details
main_folder = 'hero_details'
os.makedirs(main_folder, exist_ok=True)

# Loop through hero IDs from 1 to 126
for hero_id in range(1, 127):
    # Define the payload for hero win rate
    winrate_payload = {
        "pageSize": 20,
        "filters": [
            {"field": "main_heroid", "operator": "eq", "value": hero_id},
            {"field": "bigrank", "operator": "eq", "value": "101"},
            {"field": "match_type", "operator": "eq", "value": "1"}
        ],
        "sorts": [],
        "pageIndex": 1
    }
    
    # Send the POST request to get the hero win rate
    winrate_response = requests.post(hero_winrate_url, headers={'Content-Type': 'application/json'}, data=json.dumps(winrate_payload))

    # Check if the response is successful
    if winrate_response.status_code == 200:
        winrate_data = winrate_response.json()
        
        # Extract the hero name
        if "data" in winrate_data and "records" in winrate_data["data"]:
            records = winrate_data["data"]["records"]
            if records:
                hero_name = records[0]["data"]["main_hero"]["data"]["name"]
                print(f"Hero ID {hero_id}: {hero_name}")

                # Create a folder named after the hero
                hero_folder_name = os.path.join(main_folder, hero_name)
                os.makedirs(hero_folder_name, exist_ok=True)

                # Save hero win rate data
                winrate_file_path = os.path.join(hero_folder_name, 'winrate_data.json')
                with open(winrate_file_path, 'w') as outfile:
                    json.dump(winrate_data, outfile, indent=4)

                # Fetch hero details
                details_payload = {
                    "pageSize": 20,
                    "filters": [
                        {"field": "hero_id", "operator": "eq", "value": hero_id}
                    ],
                    "sorts": [],
                    "pageIndex": 1,
                    "object": []
                }

                details_response = requests.post(hero_details_url, headers={'Content-Type': 'application/json'}, data=json.dumps(details_payload))

                if details_response.status_code == 200:
                    details_data = details_response.json()
                    details_file_path = os.path.join(hero_folder_name, 'hero_details.json')
                    with open(details_file_path, 'w') as outfile:
                        json.dump(details_data, outfile, indent=4)
                    print(f"Hero details written to {details_file_path}")
                else:
                    print(f"Error fetching details for Hero ID {hero_id}: {details_response.status_code}, {details_response.text}")

                # Fetch hero guide
                guide_payload = {
                    "pageSize": 20,
                    "filters": [
                        {"field": "hero_id", "operator": "eq", "value": hero_id}
                    ],
                    "sorts": [],
                    "pageIndex": 1,
                    "object": [2684183]
                }

                guide_response = requests.post(hero_guide_url, headers={'Content-Type': 'application/json'}, data=json.dumps(guide_payload))

                if guide_response.status_code == 200:
                    guide_data = guide_response.json()
                    guide_file_path = os.path.join(hero_folder_name, 'guide_data.json')
                    with open(guide_file_path, 'w') as outfile:
                        json.dump(guide_data, outfile, indent=4)
                    print(f"Guide data written to {guide_file_path}")
                else:
                    print(f"Error fetching guide for Hero ID {hero_id}: {guide_response.status_code}, {guide_response.text}")

            else:
                print(f"No records found for Hero ID {hero_id}")
        else:
            print(f"No valid data for Hero ID {hero_id}")
    else:
        print(f"Error for Hero ID {hero_id}: {winrate_response.status_code}, {winrate_response.text}")

print("Hero details, win rates, and guides fetched and saved.")
