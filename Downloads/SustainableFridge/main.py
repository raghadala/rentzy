import tkinter as tk
from tkinter import *
from tkinter.font import Font
from PIL import ImageTk, Image
from tkinter import messagebox

# Function to display information message
def onClick():
    messagebox.showinfo(message="By tracking your food using our sustainable fridge, we can all do our part in reducing food waste! Keep track of the 'roots' we eat!")

# Function to open the fridge
def OpenFridge():
    # Hide the "Open Fridge" button
    openfridge_b.place_forget()

    # Change background to open fridge
    window1.configure(background="white")  # Set background to white (or any color you prefer)

    image1 = Image.open('openfridge.jpeg')  # Open the open fridge image
    img1 = image1.resize((418, 490))  # Resize the image
    my_img = ImageTk.PhotoImage(img1)  # Convert image to Tkinter format
    label = tk.Label(window1, image=my_img)  # Create label with the open fridge image
    label.image = my_img  # Keep a reference to the image to prevent garbage collection
    label.place(x=1, y=1)  # Place the label on the window

    # Fonts
    titleFont = Font(family="Times New Roman", size=20, weight="bold")
    subHeaderFont = Font(family="Times New Roman", size=13)
    bodyFont = Font(family="Times New Roman", size=14)

    # Create separation for food and days remaining before expiry
    frame = tk.Frame()
    frame.pack(pady=27)
    foodList = tk.Label(text="Food\t   Days Left", font=subHeaderFont)
    foodList.pack()

    # Create a frame so we can scroll the list
    frame = tk.Frame()
    frame.pack(pady=2)

    # Create a basic list - testing
    food = {"Strawberries": "2", "Oat Milk": "7", "Cream Cheese": "8"}

    # Create listbox for food name
    testList1 = Listbox(frame, font=bodyFont, width=13)
    testList1.pack(side=LEFT, fill=BOTH, expand=TRUE)

    # Create listbox for expiry date
    testList2 = Listbox(frame, font=bodyFont, width=3)
    testList2.pack(side=LEFT, fill=X, expand=TRUE)

    # Add list to list box
    def displayDict():
        for items in food:
            testList1.insert(END, items)

        for items in food:
            testList2.insert(END, food[items])

        for key, value in food.items():
            print(key, value)

    # Checking if values are added to dictionary properly in terminal
    displayDict()

    # Entry function with black outline
    enterItem = tk.Entry(window1, font=subHeaderFont, bd=1, relief="solid")
    enterItem.pack(pady=2)

    # Create addItem and deleteItem functions
    def addItem():
        x = enterItem.get().split(",")
        testList1.insert(END, x[0])
        testList2.insert(END, x[1])
        food[x[0]] = x[1]
        enterItem.delete(0, END)
        for key, value in food.items():
            print(key, value)

    # Delete selected item - need to delete food and days left separately
    def deleteItem():
        selected_indices = testList1.curselection()  # Get the indices of the selected items
        if selected_indices:  # Check if any items are selected
            for index in selected_indices:  # Loop through all selected indices
                testList1.delete(index)  # Delete the selected item from the food list
                testList2.delete(index)  # Delete the corresponding days left entry
                food_list = list(food.keys())  # Get a list of food names
                del food[food_list[index]]  # Delete the item from the food dictionary

    def resetFridge():
        testList1.delete(0, END)
        testList2.delete(0, END)
        food.clear()
        print("Fridge Cleared\n")

    # Create buttons to add and delete items with grey color on click
    addButton = tk.Button(text="Add Item", command=addItem, bg="white", activebackground="grey")
    addButton.place(x=215, y=365)
    delButton = tk.Button(text="Delete Item", command=deleteItem, bg="white", activebackground="grey")
    delButton.place(x=113, y=365)
    resetFridgeButton = tk.Button(text="Clear Fridge", command=resetFridge, bg="white", activebackground="grey")
    resetFridgeButton.place(x=157, y=397)

    # Button to close the fridge and return to main page
    closeFridgeButton = tk.Button(window1, text='Close Fridge', bg='#D8BFD8', fg='black', command=closeFridge)
    closeFridgeButton.place(x=150, y=330)

# Function to close the fridge and return to main page
def closeFridge():
    window1.destroy()  # Destroy the window with the open fridge
    main_window()  # Recreate the main window

# Function to create the main window
def main_window():
    global window1
    window1 = tk.Tk()
    window1.title("Sustainable Fridge")
    window1.geometry("415x500")

    # Closed fridge image
    image1 = Image.open('closed fridge.png')
    img1 = image1.resize((418, 495))
    my_img1 = ImageTk.PhotoImage(img1)
    label1 = tk.Label(window1, image=my_img1)
    label1.place(x=1, y=1)

    # Button to open the fridge
    global openfridge_b
    openfridge_b = tk.Button(window1, text='Open Fridge', bg='#D8BFD8', fg='black', command=OpenFridge)
    openfridge_b.place(x=150, y=110)

    # Button with information message
    imagel = Image.open('leaf.png')
    imgl = imagel.resize((30, 30))
    myimg = ImageTk.PhotoImage(imgl)
    buttonl = tk.Button(window1, image=myimg, command=onClick)
    buttonl.place(x=375, y=10)

    window1.mainloop()

# Call the main_window function to start the application
main_window()
