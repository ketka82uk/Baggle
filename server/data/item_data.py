from models.item import Item

list_items = [
    Item(
    name="Toy Dinosaur",
    typeof="goods",
    category="children",  
    description="This is my favourite toy dinosaur and I'm only willing to barter it because I'm middle-aged and my mummy said I had to. A bit chewed but otherwise in good condition.",
    private=False,
    available=True,
    user=1
   ),

    Item(
    name="Driver for an two hours",
    typeof="services",
    category="motors",  
    description="I don't have any money, but I do have a car. Willing to ferry you about for up to 3 hours, but you have to pay for petrol!",
    private=False,
    available=True,
    user=2
    ),

    Item(
    name="Pumpkin",
    typeof="goods",
    category="food_and_drink",  
    description="It's a pumpkin. It's orange. It's a big, f***-off pumpkin.",
    private=True,
    available=True,
    user=3
    ),

    Item(
    name="Woman with a drill",
    typeof="services",
    category="home_and_garden",  
    description="I have a drill and I'm not afraid to use it. No DIY job to big or too small.",
    private=False,
    available=True,
    user=1
    ),

    Item(
    name="Sparkly, red shoes",
    typeof="goods",
    category="clothing",  
    description="There's no place like home. There's no place like home. There's no place like home.",
    private=True,
    available=True,
    user=2
   ),

    Item(
    name="Old-School DJ",
    typeof="services",
    category="entertainment",  
    description="Yes, I'll even play the Time Warp.",
    private=True,
    available=True,
    user=3
   )
]

