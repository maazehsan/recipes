import { useState, useEffect, useRef } from 'react'
import './App.css'

// Comprehensive recipe data - 18 diverse recipes
const recipes = [
  {
    id: 1,
    title: "Butter Chicken",
    description: "Velvety tomato-based curry with tender chicken, finished with cream and aromatic spices.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop",
    tags: ["Curry", "Dinner"],
    cookTime: "45 min",
    difficulty: "Medium",
    cuisine: "Indian",
    servings: 4,
    ingredients: [
      "500g boneless chicken thighs, cubed",
      "1 cup tomato puree",
      "1/2 cup heavy cream",
      "3 tbsp butter",
      "1 large onion, finely diced",
      "4 garlic cloves, minced",
      "1 inch ginger, grated",
      "1 tsp garam masala",
      "1 tsp cumin powder",
      "1/2 tsp turmeric",
      "1 tsp paprika",
      "Salt to taste",
      "Fresh cilantro for garnish"
    ],
    steps: [
      "Marinate chicken with yogurt, salt, turmeric, and half the garam masala for at least 2 hours.",
      "Heat butter in a heavy-bottomed pan over medium heat. Sauté onions until deeply golden, about 8-10 minutes.",
      "Add garlic and ginger, cook for 2 minutes until fragrant.",
      "Stir in tomato puree, remaining spices, and cook for 15 minutes until oil separates.",
      "Add marinated chicken, stir well, and simmer covered for 20 minutes.",
      "Finish with cream and remaining butter. Adjust seasoning and garnish with fresh cilantro."
    ]
  },
  {
    id: 2,
    title: "Keema Paratha",
    description: "Flaky whole wheat flatbread stuffed with spiced minced lamb. A hearty breakfast staple.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop",
    tags: ["Breakfast", "Bread"],
    cookTime: "60 min",
    difficulty: "Hard",
    cuisine: "Pakistani",
    servings: 4,
    ingredients: [
      "2 cups whole wheat flour",
      "250g minced lamb",
      "1 medium onion, finely chopped",
      "2 green chilies, minced",
      "1/4 cup fresh coriander",
      "1 tsp cumin seeds",
      "1/2 tsp red chili powder",
      "Ghee for cooking",
      "Salt to taste"
    ],
    steps: [
      "Prepare soft dough with flour, salt, and water. Cover and rest for 30 minutes.",
      "Cook mince with onions, spices, and chilies until completely dry. Cool the mixture.",
      "Divide dough into 8 balls. Roll each into a 4-inch circle.",
      "Place spoonful of keema in center, seal edges, and flatten gently.",
      "Roll carefully into 7-inch circle without breaking.",
      "Cook on hot tawa with ghee until golden spots appear on both sides."
    ]
  },
  {
    id: 3,
    title: "Mango Lassi",
    description: "Chilled yogurt beverage blended with ripe Alphonso mangoes and a hint of cardamom.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&h=400&fit=crop",
    tags: ["Beverage", "Quick"],
    cookTime: "5 min",
    difficulty: "Easy",
    cuisine: "Indian",
    servings: 2,
    ingredients: [
      "1 large ripe mango, peeled and cubed",
      "1 cup thick yogurt",
      "1/2 cup cold milk",
      "2 tbsp sugar or honey",
      "1/4 tsp cardamom powder",
      "Pinch of saffron (optional)",
      "Ice cubes"
    ],
    steps: [
      "Chill all ingredients beforehand for best results.",
      "Add mango, yogurt, and milk to blender.",
      "Blend until completely smooth, about 1 minute.",
      "Add sugar and cardamom, blend again briefly.",
      "Pour over ice and serve immediately. Garnish with saffron strands if desired."
    ]
  },
  {
    id: 4,
    title: "Nihari",
    description: "Slow-braised beef shank in rich, aromatic gravy. An overnight delicacy from Lahore.",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=600&h=400&fit=crop",
    tags: ["Slow Cook", "Dinner"],
    cookTime: "8 hrs",
    difficulty: "Hard",
    cuisine: "Pakistani",
    servings: 6,
    ingredients: [
      "1kg beef shank with bone",
      "3 tbsp nihari masala",
      "3 tbsp wheat flour",
      "1/2 cup ghee",
      "2 large onions, sliced",
      "1 inch ginger, julienned",
      "4 green chilies",
      "Fresh coriander",
      "Lemon wedges"
    ],
    steps: [
      "Heat ghee in heavy pot. Brown beef shanks on all sides, about 10 minutes.",
      "Add sliced onions, cook until caramelized.",
      "Add nihari masala and 8 cups water. Bring to boil.",
      "Reduce heat to lowest setting, cover and simmer for 6-8 hours.",
      "Mix wheat flour with water to make slurry. Stir into gravy to thicken.",
      "Serve hot with ginger julienne, green chilies, coriander, and naan."
    ]
  },
  {
    id: 5,
    title: "Chicken Biryani",
    description: "Fragrant basmati rice layered with spiced chicken, caramelized onions, and saffron.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop",
    tags: ["Rice", "Dinner"],
    cookTime: "90 min",
    difficulty: "Hard",
    cuisine: "Pakistani",
    servings: 6,
    ingredients: [
      "500g basmati rice, soaked",
      "700g chicken pieces",
      "3 large onions, sliced thin",
      "1 cup yogurt",
      "2 tbsp biryani masala",
      "1/2 tsp saffron in 1/4 cup warm milk",
      "Fresh mint and coriander",
      "4 tbsp ghee",
      "Whole spices: bay leaves, cardamom, cinnamon"
    ],
    steps: [
      "Fry onions in ghee until deep golden. Reserve half for layering.",
      "Marinate chicken with yogurt, half the fried onions, and spices for 1 hour.",
      "Parboil rice with whole spices until 70% cooked. Drain.",
      "Layer marinated chicken at bottom of heavy pot.",
      "Top with rice, remaining fried onions, saffron milk, and herbs.",
      "Seal with dough or foil. Cook on low heat for 25 minutes. Rest 10 minutes before serving."
    ]
  },
  {
    id: 6,
    title: "Gulab Jamun",
    description: "Soft milk dumplings deep-fried to golden perfection, soaked in rose-scented syrup.",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&h=400&fit=crop",
    tags: ["Dessert", "Sweet"],
    cookTime: "40 min",
    difficulty: "Medium",
    cuisine: "Indian",
    servings: 12,
    ingredients: [
      "1 cup milk powder",
      "1/4 cup all-purpose flour",
      "1/4 tsp baking soda",
      "2 tbsp ghee, softened",
      "3-4 tbsp milk",
      "2 cups sugar",
      "2 cups water",
      "4 cardamom pods, crushed",
      "1 tbsp rose water",
      "Oil for deep frying"
    ],
    steps: [
      "Prepare syrup: boil sugar and water until slightly sticky. Add cardamom and rose water. Keep warm.",
      "Mix milk powder, flour, baking soda. Rub in ghee.",
      "Add milk gradually to form soft, smooth dough. Rest 10 minutes.",
      "Form into small, crack-free balls (they will expand).",
      "Deep fry on low heat, turning constantly, until deep brown.",
      "Immediately transfer to warm syrup. Soak at least 30 minutes before serving."
    ]
  },
  {
    id: 7,
    title: "Dal Makhani",
    description: "Black lentils and kidney beans slow-cooked overnight with butter and cream.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
    tags: ["Vegetarian", "Dinner"],
    cookTime: "4 hrs",
    difficulty: "Medium",
    cuisine: "Indian",
    servings: 6,
    ingredients: [
      "1 cup whole black lentils (urad dal)",
      "1/4 cup kidney beans (rajma)",
      "4 tbsp butter",
      "1 cup tomato puree",
      "1/2 cup cream",
      "1 onion, finely chopped",
      "1 tbsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "1 tsp red chili powder",
      "Salt to taste"
    ],
    steps: [
      "Soak lentils and kidney beans overnight. Pressure cook until completely soft.",
      "Heat butter, add cumin seeds, then onions. Cook until golden.",
      "Add ginger-garlic paste, cook 2 minutes.",
      "Add tomato puree and spices. Cook until oil separates.",
      "Add cooked dal, simmer on low heat for 2-3 hours, stirring occasionally.",
      "Finish with cream and a dollop of butter. Serve with naan."
    ]
  },
  {
    id: 8,
    title: "Seekh Kebab",
    description: "Chargrilled minced lamb skewers with fresh herbs and warming spices.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=400&fit=crop",
    tags: ["Appetizer", "Grill"],
    cookTime: "30 min",
    difficulty: "Medium",
    cuisine: "Pakistani",
    servings: 4,
    ingredients: [
      "500g minced lamb (fatty cut)",
      "1 medium onion, finely minced",
      "2 tbsp fresh coriander, chopped",
      "2 tbsp fresh mint, chopped",
      "2 green chilies, minced",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "1 tsp garam masala",
      "1 egg",
      "Salt to taste"
    ],
    steps: [
      "Combine all ingredients in a bowl. Mix vigorously for 5 minutes until sticky.",
      "Refrigerate mixture for 30 minutes to firm up.",
      "Wet hands and mold mixture onto metal skewers in long sausage shapes.",
      "Grill over high heat or under broiler, turning every 2 minutes.",
      "Cook until charred on outside and cooked through, about 8-10 minutes.",
      "Serve immediately with mint chutney and sliced onions."
    ]
  },
  {
    id: 9,
    title: "Palak Paneer",
    description: "Cubes of fresh cheese in velvety spinach gravy with subtle spicing.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop",
    tags: ["Vegetarian", "Dinner"],
    cookTime: "35 min",
    difficulty: "Easy",
    cuisine: "Indian",
    servings: 4,
    ingredients: [
      "250g paneer, cubed",
      "400g fresh spinach",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tbsp ginger-garlic paste",
      "2 green chilies",
      "1/2 tsp cumin seeds",
      "1/4 cup cream",
      "2 tbsp ghee",
      "Salt to taste"
    ],
    steps: [
      "Blanch spinach in boiling water for 2 minutes. Plunge into ice water. Blend to smooth paste.",
      "Lightly fry paneer cubes until golden. Set aside.",
      "Heat ghee, add cumin seeds, then onions. Cook until soft.",
      "Add ginger-garlic paste and tomatoes. Cook until tomatoes break down.",
      "Add spinach puree, chilies, and salt. Simmer 10 minutes.",
      "Add paneer and cream. Cook 5 more minutes. Serve hot."
    ]
  },
  {
    id: 10,
    title: "Chicken Tikka",
    description: "Yogurt-marinated chicken thighs charred in tandoor with aromatic spices.",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&h=400&fit=crop",
    tags: ["Appetizer", "Grill"],
    cookTime: "4 hrs",
    difficulty: "Easy",
    cuisine: "Indian",
    servings: 4,
    ingredients: [
      "500g boneless chicken thighs",
      "1 cup thick yogurt",
      "2 tbsp tikka masala",
      "1 tbsp ginger-garlic paste",
      "2 tbsp mustard oil",
      "1 tbsp lemon juice",
      "1/2 tsp red food color (optional)",
      "Salt to taste"
    ],
    steps: [
      "Cut chicken into 2-inch pieces.",
      "Whisk together yogurt, all spices, oil, and lemon juice.",
      "Coat chicken thoroughly. Marinate refrigerated for minimum 4 hours, preferably overnight.",
      "Thread onto skewers. Grill on high heat or bake at 450°F.",
      "Cook 12-15 minutes, turning once, until charred edges appear.",
      "Squeeze fresh lemon over top. Serve with green chutney."
    ]
  },
  {
    id: 11,
    title: "Aloo Gosht",
    description: "Rustic meat and potato curry in tomato-onion gravy. Everyday comfort food.",
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=600&h=400&fit=crop",
    tags: ["Curry", "Dinner"],
    cookTime: "60 min",
    difficulty: "Easy",
    cuisine: "Pakistani",
    servings: 5,
    ingredients: [
      "500g mutton or beef, cubed",
      "3 medium potatoes, quartered",
      "2 onions, sliced",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "1/2 tsp turmeric",
      "4 tbsp oil",
      "Fresh coriander for garnish"
    ],
    steps: [
      "Heat oil, fry onions until deep golden brown.",
      "Add ginger-garlic paste, cook 2 minutes.",
      "Add meat, brown on all sides for 10 minutes.",
      "Add all spices and tomato puree. Cook until oil separates.",
      "Add 2 cups water, cover and simmer until meat is tender, about 45 minutes.",
      "Add potatoes, cook until soft. Garnish with coriander."
    ]
  },
  {
    id: 12,
    title: "Kheer",
    description: "Traditional rice pudding slow-simmered in milk with cardamom and nuts.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop",
    tags: ["Dessert", "Sweet"],
    cookTime: "45 min",
    difficulty: "Easy",
    cuisine: "Indian",
    servings: 6,
    ingredients: [
      "1/4 cup basmati rice, washed",
      "1 liter full-fat milk",
      "1/2 cup sugar",
      "1/4 tsp cardamom powder",
      "2 tbsp each: almonds, pistachios, sliced",
      "1 tbsp raisins",
      "Pinch of saffron"
    ],
    steps: [
      "Soak rice in water for 30 minutes. Drain.",
      "Bring milk to boil in heavy-bottomed pan, stirring frequently.",
      "Add rice, reduce heat to low. Simmer 30-35 minutes, stirring often.",
      "When rice is completely soft and milk has thickened, add sugar.",
      "Cook 5 more minutes. Add cardamom and saffron.",
      "Serve warm or chilled, topped with nuts and raisins."
    ]
  },
  {
    id: 13,
    title: "Chapli Kebab",
    description: "Peshawar-style flat patties with tomatoes, pomegranate seeds, and fresh herbs.",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=400&fit=crop",
    tags: ["Appetizer", "Grill"],
    cookTime: "25 min",
    difficulty: "Medium",
    cuisine: "Pakistani",
    servings: 6,
    ingredients: [
      "500g beef mince (coarse ground)",
      "1 medium onion, finely chopped",
      "2 tomatoes, deseeded and chopped",
      "2 tbsp fresh coriander",
      "1 tbsp pomegranate seeds (dried anardana)",
      "2 eggs",
      "1 tbsp cumin seeds",
      "1 tsp crushed coriander seeds",
      "Oil for shallow frying"
    ],
    steps: [
      "Mix all ingredients except oil. The mixture should be loose, not tight.",
      "Shape into large, flat patties about 1/2 inch thick.",
      "Heat generous oil in cast iron skillet.",
      "Fry patties 3-4 minutes each side until deeply browned and crisp.",
      "Drain on paper towels briefly.",
      "Serve hot with naan and raita."
    ]
  },
  {
    id: 14,
    title: "Saag Aloo",
    description: "Tender potatoes and mustard greens cooked with garlic and cumin.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    tags: ["Vegetarian", "Side"],
    cookTime: "30 min",
    difficulty: "Easy",
    cuisine: "Indian",
    servings: 4,
    ingredients: [
      "400g mustard greens or spinach",
      "3 medium potatoes, cubed",
      "4 garlic cloves, minced",
      "1 inch ginger, grated",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 green chili",
      "3 tbsp ghee",
      "Salt to taste"
    ],
    steps: [
      "Boil potatoes until just tender. Drain and set aside.",
      "Blanch greens, then roughly chop.",
      "Heat ghee, add cumin seeds until they splutter.",
      "Add garlic and ginger, cook 1 minute.",
      "Add greens, turmeric, and chili. Cook 5 minutes.",
      "Add potatoes, mix gently. Cook 10 minutes until flavors meld."
    ]
  },
  {
    id: 15,
    title: "Chicken Karahi",
    description: "Wok-tossed chicken with tomatoes, ginger, and fresh green chilies.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&h=400&fit=crop",
    tags: ["Curry", "Quick"],
    cookTime: "35 min",
    difficulty: "Easy",
    cuisine: "Pakistani",
    servings: 4,
    ingredients: [
      "500g chicken, bone-in pieces",
      "4 tomatoes, roughly chopped",
      "3 inch ginger, julienned",
      "6 green chilies, slit",
      "4 tbsp ghee",
      "1 tsp cumin seeds",
      "1 tsp coriander powder",
      "Salt to taste",
      "Fresh coriander"
    ],
    steps: [
      "Heat ghee in karahi or wok on high heat.",
      "Add chicken, sear on all sides until golden.",
      "Add cumin seeds and half the ginger.",
      "Add tomatoes, salt, and coriander powder. Cover and cook 20 minutes.",
      "Remove lid, increase heat. Cook until oil separates and tomatoes break down.",
      "Top with remaining ginger, green chilies, and fresh coriander."
    ]
  },
  {
    id: 16,
    title: "Gajar Halwa",
    description: "Grated carrots slow-cooked in milk and ghee, studded with nuts.",
    image: "https://images.unsplash.com/photo-1666190077587-2c4d69a2e47a?w=600&h=400&fit=crop",
    tags: ["Dessert", "Sweet"],
    cookTime: "60 min",
    difficulty: "Medium",
    cuisine: "Indian",
    servings: 8,
    ingredients: [
      "1kg carrots, grated",
      "1 liter full-fat milk",
      "1 cup sugar",
      "4 tbsp ghee",
      "1/2 tsp cardamom powder",
      "Almonds and pistachios for garnish",
      "2 tbsp raisins"
    ],
    steps: [
      "Grate carrots using large holes of grater.",
      "Bring milk to boil in wide, heavy pan. Add carrots.",
      "Cook on medium heat, stirring frequently, until milk is absorbed (about 40 minutes).",
      "Add ghee, cook another 10 minutes.",
      "Add sugar, cook until moisture evaporates and halwa leaves sides of pan.",
      "Add cardamom, garnish with nuts. Serve warm."
    ]
  },
  {
    id: 17,
    title: "Samosa",
    description: "Crispy triangular pastries filled with spiced potatoes and peas.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop",
    tags: ["Appetizer", "Snack"],
    cookTime: "45 min",
    difficulty: "Hard",
    cuisine: "Indian",
    servings: 12,
    ingredients: [
      "For pastry: 2 cups flour, 4 tbsp oil, salt, water",
      "4 medium potatoes, boiled and mashed",
      "1/2 cup green peas",
      "1 tsp cumin seeds",
      "1 tsp coriander powder",
      "1/2 tsp garam masala",
      "2 green chilies, minced",
      "Fresh coriander",
      "Oil for deep frying"
    ],
    steps: [
      "Make dough with flour, oil, salt, and water. Rest 30 minutes.",
      "Cook cumin in oil, add peas, then mashed potatoes and all spices. Cool completely.",
      "Divide dough into balls. Roll into ovals, cut in half.",
      "Form cones from semicircles, fill with potato mixture, seal edges with water.",
      "Deep fry on medium-low heat until golden and crispy, about 8 minutes.",
      "Serve hot with tamarind and mint chutneys."
    ]
  },
  {
    id: 18,
    title: "Lamb Rogan Josh",
    description: "Kashmiri braised lamb in rich red gravy with fennel and dried ginger.",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop",
    tags: ["Curry", "Dinner"],
    cookTime: "2 hrs",
    difficulty: "Hard",
    cuisine: "Indian",
    servings: 6,
    ingredients: [
      "750g lamb shoulder, cubed",
      "1 cup yogurt",
      "4 tbsp mustard oil",
      "2 bay leaves",
      "4 cloves, 4 cardamom pods",
      "1 tsp fennel powder",
      "1 tsp dried ginger powder",
      "2 tsp Kashmiri red chili powder",
      "1/2 tsp asafoetida",
      "Fresh coriander"
    ],
    steps: [
      "Heat mustard oil until smoking, let cool slightly.",
      "Add whole spices, then lamb. Brown well on all sides.",
      "Mix yogurt with all ground spices and salt. Add to pot.",
      "Add asafoetida and 1 cup water. Bring to boil.",
      "Reduce heat, cover, and braise 1.5-2 hours until lamb is fork-tender.",
      "Garnish with fresh coriander. Serve with steamed rice."
    ]
  },
  {
    id: 19,
    title: "Beef Stroganoff",
    description: "Tender beef strips in a rich, creamy mushroom and sour cream sauce.",
    image: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=600&h=400&fit=crop",
    tags: ["Dinner", "Quick"],
    cookTime: "35 min",
    difficulty: "Medium",
    cuisine: "Continental",
    servings: 4,
    ingredients: [
      "500g beef sirloin, sliced thin",
      "250g cremini mushrooms, sliced",
      "1 large onion, diced",
      "3 cloves garlic, minced",
      "1 cup beef broth",
      "1 cup sour cream",
      "2 tbsp Dijon mustard",
      "3 tbsp butter",
      "2 tbsp flour",
      "Fresh parsley for garnish",
      "Salt and pepper to taste"
    ],
    steps: [
      "Season beef strips with salt and pepper. Sear in hot butter until browned. Set aside.",
      "In the same pan, sauté onions until softened. Add mushrooms and cook until golden.",
      "Add garlic and cook for 1 minute until fragrant.",
      "Sprinkle flour over vegetables, stir to coat. Cook for 1 minute.",
      "Pour in beef broth, stir well, and bring to a simmer.",
      "Reduce heat, stir in sour cream and mustard. Return beef to pan and heat through. Serve over egg noodles."
    ]
  },
  {
    id: 20,
    title: "Chicken Cordon Bleu",
    description: "Breaded chicken breast stuffed with ham and Swiss cheese, baked golden.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop",
    tags: ["Dinner", "Appetizer"],
    cookTime: "45 min",
    difficulty: "Medium",
    cuisine: "Continental",
    servings: 4,
    ingredients: [
      "4 chicken breasts, butterflied",
      "8 slices ham",
      "4 slices Swiss cheese",
      "1 cup breadcrumbs",
      "1/2 cup flour",
      "2 eggs, beaten",
      "4 tbsp butter, melted",
      "1 tsp dried thyme",
      "Salt and pepper to taste"
    ],
    steps: [
      "Preheat oven to 375°F. Pound chicken breasts to even thickness.",
      "Layer ham and cheese on each breast. Roll up and secure with toothpicks.",
      "Set up breading station: flour, beaten eggs, and breadcrumbs mixed with thyme.",
      "Coat each roll in flour, dip in egg, then coat in breadcrumbs.",
      "Place seam-side down on baking sheet. Drizzle with melted butter.",
      "Bake 25-30 minutes until golden and cooked through. Rest 5 minutes before slicing."
    ]
  },
  {
    id: 21,
    title: "French Onion Soup",
    description: "Deeply caramelized onions in rich beef broth, topped with crusty bread and melted Gruyère.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    tags: ["Appetizer", "Slow Cook"],
    cookTime: "90 min",
    difficulty: "Medium",
    cuisine: "Continental",
    servings: 6,
    ingredients: [
      "6 large onions, thinly sliced",
      "4 tbsp butter",
      "1 tbsp olive oil",
      "1 tsp sugar",
      "6 cups beef broth",
      "1 cup dry white wine",
      "1 baguette, sliced",
      "2 cups Gruyère cheese, grated",
      "2 sprigs fresh thyme",
      "Salt and pepper to taste"
    ],
    steps: [
      "Heat butter and oil in a large pot. Add onions and cook on low heat for 45 minutes, stirring occasionally.",
      "Add sugar to help caramelization. Continue cooking until deep golden brown.",
      "Pour in wine and scrape up any browned bits. Let reduce by half.",
      "Add beef broth and thyme. Simmer for 20 minutes. Season to taste.",
      "Ladle soup into oven-safe bowls. Top with bread slices and generous Gruyère.",
      "Broil until cheese is bubbly and golden. Serve immediately."
    ]
  },
  {
    id: 22,
    title: "Mushroom Risotto",
    description: "Creamy Arborio rice with porcini and cremini mushrooms, finished with Parmesan.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop",
    tags: ["Vegetarian", "Dinner"],
    cookTime: "40 min",
    difficulty: "Medium",
    cuisine: "Continental",
    servings: 4,
    ingredients: [
      "1.5 cups Arborio rice",
      "1 oz dried porcini mushrooms",
      "200g cremini mushrooms, sliced",
      "1 shallot, finely diced",
      "4 cups vegetable broth, warmed",
      "1/2 cup dry white wine",
      "1/2 cup Parmesan, grated",
      "3 tbsp butter",
      "2 tbsp olive oil",
      "Fresh thyme and parsley"
    ],
    steps: [
      "Soak porcini in 1 cup hot water for 20 minutes. Reserve liquid and chop.",
      "Sauté cremini mushrooms in butter until golden. Set aside.",
      "In the same pan, cook shallot in olive oil until soft. Add rice and toast for 2 minutes.",
      "Add wine and stir until absorbed. Add porcini soaking liquid.",
      "Add warm broth one ladle at a time, stirring constantly, until rice is creamy and al dente.",
      "Fold in mushrooms, Parmesan, and remaining butter. Garnish with fresh herbs."
    ]
  },
  {
    id: 23,
    title: "Crème Brûlée",
    description: "Silky vanilla custard with a crisp caramelized sugar crust.",
    image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=600&h=400&fit=crop",
    tags: ["Dessert", "Sweet"],
    cookTime: "5 hrs",
    difficulty: "Hard",
    cuisine: "Continental",
    servings: 6,
    ingredients: [
      "2 cups heavy cream",
      "5 egg yolks",
      "1/2 cup granulated sugar",
      "1 vanilla bean, split",
      "Pinch of salt",
      "6 tbsp superfine sugar for topping"
    ],
    steps: [
      "Preheat oven to 325°F. Heat cream with vanilla bean until just simmering. Remove from heat and steep 15 minutes.",
      "Whisk egg yolks and sugar until pale. Slowly pour in warm cream, whisking constantly.",
      "Strain custard into ramekins. Place in baking dish filled with hot water halfway up sides.",
      "Bake 40-45 minutes until set but still jiggly in center.",
      "Refrigerate at least 4 hours or overnight.",
      "Before serving, sprinkle sugar evenly and torch until caramelized. Let sit 1 minute before serving."
    ]
  }
]

// SVG Icons Component
const Icons = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22c4-3 7-6.5 7-10.5C19 7.5 16 4 12 2c-1 2-2 3-3 4-2 2-4 4-4 5.5C5 15.5 8 19 12 22z"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12,5 19,12 12,19"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  filter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

// Header Component
function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="/" className="header__logo">
          <span className="header__logo-accent">Hadia</span>
          <span className="header__logo-main">Noor</span>
        </a>
        <nav className="header__nav">
          <span className="header__tagline">Curated Recipes</span>
          <a 
            href="https://instagram.com/hadianoorzz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="header__social"
            aria-label="Follow on Instagram"
          >
            {Icons.instagram}
          </a>
        </nav>
      </div>
    </header>
  )
}

// Search and Filter Bar
function SearchFilterBar({ 
  searchTerm, 
  setSearchTerm, 
  activeTag, 
  setActiveTag, 
  activeCuisine, 
  setActiveCuisine,
  activeDifficulty,
  setActiveDifficulty 
}) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const allTags = ["All", "Curry", "Dinner", "Breakfast", "Appetizer", "Vegetarian", "Dessert", "Quick", "Grill"]
  const cuisines = ["All", "Indian", "Pakistani", "Continental"]
  const difficulties = ["All", "Easy", "Medium", "Hard"]

  const activeFiltersCount = [
    activeTag !== 'All' ? 1 : 0,
    activeCuisine !== 'All' ? 1 : 0,
    activeDifficulty !== 'All' ? 1 : 0
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="filters">
      <div className="filters__top">
        <div className="filters__search">
          <span className="filters__search-icon">{Icons.search}</span>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filters__search-input"
          />
        </div>
        
        <button 
          className={`filters__toggle ${filtersOpen ? 'filters__toggle--active' : ''}`}
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
        >
          {Icons.filter}
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="filters__toggle-badge">{activeFiltersCount}</span>
          )}
        </button>
      </div>
      
      <div className={`filters__groups ${filtersOpen ? 'filters__groups--open' : ''}`}>
        <div className="filters__groups-inner">
          <div className="filters__group">
            <label className="filters__label">Category</label>
            <div className="filters__options">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`filters__btn ${activeTag === tag ? 'filters__btn--active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filters__row">
            <div className="filters__group filters__group--small">
              <label className="filters__label">Cuisine</label>
              <div className="filters__options">
                {cuisines.map(cuisine => (
                  <button
                    key={cuisine}
                    className={`filters__btn ${activeCuisine === cuisine ? 'filters__btn--active' : ''}`}
                    onClick={() => setActiveCuisine(cuisine)}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filters__group filters__group--small">
              <label className="filters__label">Difficulty</label>
              <div className="filters__options">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    className={`filters__btn ${activeDifficulty === diff ? 'filters__btn--active' : ''}`}
                    onClick={() => setActiveDifficulty(diff)}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Recipe Card Component
function RecipeCard({ recipe, onClick, index }) {
  return (
    <article 
      className="card" 
      onClick={onClick}
      style={{ '--delay': `${index * 0.05}s` }}
    >
      <div className="card__image-wrap">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="card__image"
          loading="lazy"
        />
        <div className="card__overlay">
          <span className="card__cta">
            View Recipe
            <span className="card__cta-icon">{Icons.arrow}</span>
          </span>
        </div>
      </div>
      
      <div className="card__body">
        <div className="card__meta">
          <span className="card__cuisine">{recipe.cuisine}</span>
          <span className="card__dot"></span>
          <span className="card__difficulty">{recipe.difficulty}</span>
        </div>
        
        <h3 className="card__title">{recipe.title}</h3>
        <p className="card__desc">{recipe.description}</p>
        
        <div className="card__footer">
          <div className="card__stat">
            <span className="card__stat-icon">{Icons.clock}</span>
            <span>{recipe.cookTime}</span>
          </div>
          <div className="card__stat">
            <span className="card__stat-icon">{Icons.users}</span>
            <span>{recipe.servings}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

// Recipe Grid
function RecipeGrid({ recipes, onRecipeClick }) {
  if (recipes.length === 0) {
    return (
      <div className="empty">
        <div className="empty__icon">{Icons.search}</div>
        <h3 className="empty__title">No recipes found</h3>
        <p className="empty__text">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid">
      {recipes.map((recipe, index) => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          onClick={() => onRecipeClick(recipe)}
          index={index}
        />
      ))}
    </div>
  )
}

// Recipe Modal
function RecipeModal({ recipe, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  if (!recipe) return null

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__container" ref={modalRef} onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          {Icons.close}
        </button>
        
        <div className="modal__hero">
          <img src={recipe.image} alt={recipe.title} className="modal__image" />
          <div className="modal__hero-overlay"></div>
          <div className="modal__hero-content">
            <span className="modal__cuisine">{recipe.cuisine} Cuisine</span>
            <h2 className="modal__title">{recipe.title}</h2>
          </div>
        </div>
        
        <div className="modal__body">
          <div className="modal__stats">
            <div className="modal__stat">
              <span className="modal__stat-icon">{Icons.clock}</span>
              <div className="modal__stat-content">
                <span className="modal__stat-value">{recipe.cookTime}</span>
                <span className="modal__stat-label">Cook Time</span>
              </div>
            </div>
            <div className="modal__stat">
              <span className="modal__stat-icon">{Icons.users}</span>
              <div className="modal__stat-content">
                <span className="modal__stat-value">{recipe.servings}</span>
                <span className="modal__stat-label">Servings</span>
              </div>
            </div>
            <div className="modal__stat">
              <span className="modal__stat-icon">{Icons.flame}</span>
              <div className="modal__stat-content">
                <span className="modal__stat-value">{recipe.difficulty}</span>
                <span className="modal__stat-label">Difficulty</span>
              </div>
            </div>
          </div>
          
          <p className="modal__desc">{recipe.description}</p>
          
          <div className="modal__sections">
            <section className="modal__section">
              <h3 className="modal__section-title">
                <span className="modal__section-num">01</span>
                Ingredients
              </h3>
              <ul className="modal__ingredients">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="modal__ingredient">
                    <span className="modal__ingredient-marker"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </section>
            
            <section className="modal__section">
              <h3 className="modal__section-title">
                <span className="modal__section-num">02</span>
                Method
              </h3>
              <ol className="modal__steps">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="modal__step">
                    <span className="modal__step-num">{String(i + 1).padStart(2, '0')}</span>
                    <p className="modal__step-text">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
          
          <a 
            href="" 
            target="_blank" 
            rel="noopener noreferrer"
            className="modal__reel-btn"
          >
            {Icons.instagram}
            <span>Watch Recipe Reel</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Hadia Noor</span>
          <p className="footer__tagline">Authentic recipes from the heart</p>
        </div>
        <div className="footer__links">
          <a 
            href="https://instagram.com/hadianoorzz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer__social"
          >
            {Icons.instagram}
            <span>@hadianoorzz</span>
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>2026 Hadia Noor. All recipes crafted with care.</p>
      </div>
    </footer>
  )
}

// Main App
function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [activeCuisine, setActiveCuisine] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesTag = activeTag === 'All' || recipe.tags.includes(activeTag)
    const matchesCuisine = activeCuisine === 'All' || recipe.cuisine === activeCuisine
    const matchesDifficulty = activeDifficulty === 'All' || recipe.difficulty === activeDifficulty
    
    return matchesSearch && matchesTag && matchesCuisine && matchesDifficulty
  })

  return (
    <div className="app">
      <Header />
      
      <main className="main">
        <div className="hero-minimal">
          <h1 className="hero-minimal__title">
            <span className="hero-minimal__line">The Hadia Noor</span>
            <span className="hero-minimal__line hero-minimal__line--accent">Recipe Collection</span>
          </h1>
          <p className="hero-minimal__subtitle">
            Many handcrafted recipes celebrating South Asian and Continental cuisine
          </p>
        </div>
        
        <SearchFilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
          activeCuisine={activeCuisine}
          setActiveCuisine={setActiveCuisine}
          activeDifficulty={activeDifficulty}
          setActiveDifficulty={setActiveDifficulty}
        />
        
        <div className="results-info">
          <span className="results-info__count">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
          </span>
        </div>
        
        <RecipeGrid 
          recipes={filteredRecipes} 
          onRecipeClick={setSelectedRecipe}
        />
      </main>
      
      <Footer />
      
      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  )
}

export default App
