import os

print("--- Memeriksa Lokasi dan File ---")
print(f"Direktori saat ini: {os.getcwd()}")
print("\nFile dan folder di direktori ini:")
print(os.listdir('.'))
print("\nSelesai.")