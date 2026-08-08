#!/usr/bin/env bash
# Run this once on your own machine (needs internet). It downloads the
# exact same Wikimedia Commons food photos the app used to fetch live,
# and saves them locally into public/images/ so the app has zero
# runtime network dependency for images.
#
# Usage:
#   chmod +x scripts_download_images.sh
#   ./scripts_download_images.sh

set -e
mkdir -p public/images
cd public/images

download() {
  local commons_filename="$1"
  local local_name="$2"
  local url="https://commons.wikimedia.org/wiki/Special:FilePath/$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))" "$commons_filename")?width=800"
  echo "Downloading: $commons_filename -> $local_name"
  curl -L -sS -o "$local_name" "$url"
}

download "A Thali, famous South Indian meal served on a banana leaf.jpg" "thali-banana-leaf.jpg"
download "A traditional veg thali at Karnataka.jpg" "veg-thali-karnataka.jpg"
download "Appam with kadala curry from kerala.jpg" "appam-kadala-curry.jpg"
download "Butter Naan 2.jpg" "butter-naan.jpg"
download "Chicken 65.jpg" "chicken-65.jpg"
download "Chicken Biryani.jpg" "chicken-biryani.jpg"
download "Chicken Fried Rice.JPG" "chicken-fried-rice.jpg"
download "Chicken Hyderabadi Biryani.JPG" "chicken-hyderabadi-biryani.jpg"
download "Dosai Chutney Hotel Saravana Bhavan.jpg" "masala-dosa.jpg"
download "Idli Sambar.JPG" "idli-sambar.jpg"
download "Kheer.jpg" "kheer-payasam.jpg"
download "Meal BananaLeaf.JPG" "meal-banana-leaf.jpg"
download "Medu Vada.JPG" "medu-vada.jpg"
download "Paneer Butter Masala.jpg" "paneer-butter-masala.jpg"
download "Pizza quasi Margherita.jpg" "pizza-margherita.jpg"
download "Poori or Puri.JPG" "poori.jpg"

echo "Done. 16 images saved to public/images/"
