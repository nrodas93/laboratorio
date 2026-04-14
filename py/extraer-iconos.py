
import json

def main():
    iconos = []
    with open(r'C:\Users\nelson\Downloads\fontawesome-icons.css') as f:
        with open("iconos.txt", "w") as salida:
            for line in f:
                if "fa-" in line and ":before" in line:
                    ico = line.split(":before")[0].strip().replace(".","")
                    name = ico.replace("fa-","").replace("-"," ")
                    iconos.append({"name": name, "icon": ico})
    with open("iconos.json", "w") as salida:
        json.dump(iconos, salida, indent=4)

if __name__ == "__main__":
    main()