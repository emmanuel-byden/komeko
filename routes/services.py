from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_services():
    services = [
        {"name": "Wedding Celebrations", "description": "Transform your special day into a culinary fairy tale with our exquisite wedding catering."},
        {"name": "Corporate Events", "description": "Elevate your business gatherings with professional catering that impresses clients and motivates teams."},
        {"name": "Graduation Parties", "description": "Celebrate academic achievements with memorable graduation feasts."},
        {"name": "Baby Showers", "description": "Welcome new life with tender care and delightful refreshments."},
        {"name": "Birthday Celebrations", "description": "Make every birthday unforgettable with personalized culinary experiences."},
        {"name": "Religious Ceremonies", "description": "Honor sacred traditions with respectful and meaningful catering services."},
        {"name": "Concert & Entertainment", "description": "Fuel the energy of your entertainment events with dynamic catering solutions."},
        {"name": "Annual Galas", "description": "Create sophisticated dining experiences for your annual celebrations."},
        {"name": "Anniversary Celebrations", "description": "Commemorate love's enduring journey with romantic anniversary dining."},
        {"name": "Brunch Events", "description": "Start your day right with our delightful brunch catering."},
        {"name": "Family Reunions", "description": "Bring families together with comforting, home-style catering."},
        {"name": "Award Ceremonies", "description": "Honor achievements with prestigious catering."},
        {"name": "Photo Shoots", "description": "Keep your creative teams energized with convenient on-location catering."},
        {"name": "Product Launches", "description": "Launch your products in style with innovative catering."},
        {"name": "Private Dinners", "description": "Experience intimate culinary excellence with our private dinner service."},
    ]
    return services
