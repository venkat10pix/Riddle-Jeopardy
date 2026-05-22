// Riddle Jeopardy - Riddle Pool Database
// 6 categories, each with 3 riddles per difficulty level ($100, $200, $300, $400, $500)
// Total of 90 standard riddles and 10 dedicated tie-breaker riddles.

const RIDDLE_POOL = {
  "Wordplay Wonders": {
    100: [
      {
        id: "word_100_1",
        question: "What letter of the alphabet has the most water?",
        choices: ["A", "C", "P", "T"],
        answer: "C",
        explanation: "C - It sounds exactly like the word 'sea', which is a huge body of water!"
      },
      {
        id: "word_100_2",
        question: "What is at the end of a rainbow?",
        choices: ["A pot of gold", "The letter W", "A beautiful light", "The letter R"],
        answer: "The letter W",
        explanation: "THE LETTER W - Look closely at the word 'rainbow'—the very last letter is W!"
      },
      {
        id: "word_100_3",
        question: "What building has the most stories?",
        choices: ["A library", "A skyscraper", "A school", "A museum"],
        answer: "A library",
        explanation: "A LIBRARY - A library is full of books, so it has thousands of 'stories' (tales) inside it!"
      }
    ],
    200: [
      {
        id: "word_200_1",
        question: "Which word in the dictionary is spelled incorrectly?",
        choices: ["Incorrectly", "Misspelled", "Wrong", "Dictionary"],
        answer: "Incorrectly",
        explanation: "INCORRECTLY - The word 'incorrectly' is always spelled I-N-C-O-R-R-E-C-T-L-Y in the dictionary!"
      },
      {
        id: "word_200_2",
        question: "What starts with T, ends with T, and has T in it?",
        choices: ["A teapot", "A ticket", "A toast", "A target"],
        answer: "A teapot",
        explanation: "A TEAPOT - It starts with the letter T, ends with T, and inside it, it holds delicious warm tea!"
      },
      {
        id: "word_200_3",
        question: "Which letter of the alphabet is a question?",
        choices: ["Y", "R", "B", "U"],
        answer: "Y",
        explanation: "Y - The letter 'Y' sounds exactly like the question word 'Why?'!"
      }
    ],
    300: [
      {
        id: "word_300_1",
        question: "Forward I am heavy, but backward I am not. What am I?",
        choices: ["The word NOT", "A ton", "A feather", "A scale"],
        answer: "A ton",
        explanation: "A TON - Forward, the word is 'ton' (which weighs 2,000 pounds!). Backward, it spells 'not'!"
      },
      {
        id: "word_300_2",
        question: "What starts with an E, ends with an E, but only contains one letter?",
        choices: ["An envelope", "An eye", "An engine", "An eagle"],
        answer: "An envelope",
        explanation: "AN ENVELOPE - It starts with 'E' and ends with 'E', and you put a single letter (mail) inside it!"
      },
      {
        id: "word_300_3",
        question: "What starts with P, ends with E, and has thousands of letters?",
        choices: ["A post office", "A page", "A package", "A puzzle"],
        answer: "A post office",
        explanation: "A POST OFFICE - It starts with P, ends with E, and houses thousands of paper letters (mail)!"
      }
    ],
    400: [
      {
        id: "word_400_1",
        question: "I have keys but no locks. I have space but no room. You can enter but can't go outside. What am I?",
        choices: ["A keyboard", "A map", "A diary", "A hotel"],
        answer: "A keyboard",
        explanation: "A KEYBOARD - It has keys (like letters), a space bar, an Enter key, and you use it to type!"
      },
      {
        id: "word_400_2",
        question: "What English word has three consecutive double letters?",
        choices: ["Bookkeeper", "Sleepless", "Committee", "Balloon"],
        answer: "Bookkeeper",
        explanation: "BOOKKEEPER - Count the double letters: oo, kk, and ee. They are right next to each other!"
      },
      {
        id: "word_400_3",
        question: "What word is spelled the same backward and forward?",
        choices: ["Racecar", "Bicycle", "Rainbow", "Balloon"],
        answer: "Racecar",
        explanation: "RACECAR - The word R-A-C-E-C-A-R is a palindrome—it reads exactly the same from left to right and right to left!"
      }
    ],
    500: [
      {
        id: "word_500_1",
        question: "I am a word of five letters. If you take away two letters, only one remains. What word am I?",
        choices: ["Alone", "Stone", "Money", "House"],
        answer: "Stone",
        explanation: "STONE - If you remove 'S' and 'T' from 'stone', you are left with the word 'one'!"
      },
      {
        id: "word_500_2",
        question: "I am a five-letter word. Remove my first letter, and I am a tasty treat. Remove my first two letters, and I am a creative subject. What am I?",
        choices: ["Smart", "Start", "Stare", "Stone"],
        answer: "Start",
        explanation: "START - Remove 'S' and you get 'tart' (a delicious pastry!). Remove 'S' and 'T' and you get 'art' (drawing and painting class!)"
      },
      {
        id: "word_500_3",
        question: "What word has two 'eyes' in it but cannot see?",
        choices: ["Onion", "Science", "Eyeing", "Mirror"],
        answer: "Onion",
        explanation: "ONION - The word O-N-I-O-N has two letters 'O' which look like two eyes but cannot see!"
      }
    ]
  },
  "Animal Crackers": {
    100: [
      {
        id: "anim_100_1",
        question: "I am slow and carry my house on my back. Who am I?",
        choices: ["A snail", "A crab", "A spider", "A turtle"],
        answer: "A snail",
        explanation: "A SNAIL - Snails move very slowly and carry their spiral shells on their backs wherever they go!"
      },
      {
        id: "anim_100_2",
        question: "I have no legs, but I can climb trees and hiss. Who am I?",
        choices: ["A caterpillar", "A snake", "A monkey", "A squirrel"],
        answer: "A snake",
        explanation: "A SNAKE - Snakes are legless reptiles that can slide up trees, and they make a 'hissing' sound!"
      },
      {
        id: "anim_100_3",
        question: "What do you call a baby bear?",
        choices: ["A cub", "A pup", "A calf", "A kitten"],
        answer: "A cub",
        explanation: "A CUB - A baby bear, lion, or tiger is called a cub!"
      }
    ],
    200: [
      {
        id: "anim_200_1",
        question: "I am known as the King of the Jungle, but I actually live in grasslands. Who am I?",
        choices: ["A tiger", "A lion", "An elephant", "A gorilla"],
        answer: "A lion",
        explanation: "A LION - Lions are called the King of the Jungle, even though they actually live in open savannas and grasslands!"
      },
      {
        id: "anim_200_2",
        question: "I sleep upside down, fly at night, and use echo-location to find my food. Who am I?",
        choices: ["An owl", "A moth", "A bat", "A flying squirrel"],
        answer: "A bat",
        explanation: "A BAT - Bats are nocturnal mammals that hang upside down to rest and use sonar (echolocation) to navigate!"
      },
      {
        id: "anim_200_3",
        question: "I am a bird, I can swim, but I cannot fly. I love the cold. What am I?",
        choices: ["A penguin", "A duck", "A seagull", "A parrot"],
        answer: "A penguin",
        explanation: "A PENGUIN - Penguins are flightless birds that are excellent swimmers and live in cold climates!"
      }
    ],
    300: [
      {
        id: "anim_300_1",
        question: "I have black and white stripes, but I am not a zebra. I am very smelly when scared. Who am I?",
        choices: ["A badger", "A skunk", "A panda", "A raccoon"],
        answer: "A skunk",
        explanation: "A SKUNK - Skunks have black and white fur, and they spray a super-smelly liquid to defend themselves!"
      },
      {
        id: "anim_300_2",
        question: "I have three hearts, blue blood, and eight arms. Who am I?",
        choices: ["A jellyfish", "A starfish", "An octopus", "A crab"],
        answer: "An octopus",
        explanation: "AN OCTOPUS - Octopuses are amazing creatures with three hearts, copper-based blue blood, and eight powerful arms!"
      },
      {
        id: "anim_300_3",
        question: "What animal has the longest tongue relative to its body?",
        choices: ["A chameleon", "A frog", "A giraffe", "An anteater"],
        answer: "A chameleon",
        explanation: "A CHAMELEON - A chameleon's tongue can be up to twice the length of its entire body!"
      }
    ],
    400: [
      {
        id: "anim_400_1",
        question: "I can run very fast, I have a long neck, and my eggs are the biggest in the world. But I cannot fly! Who am I?",
        choices: ["A penguin", "An ostrich", "A peacock", "A flamingo"],
        answer: "An ostrich",
        explanation: "AN OSTRICH - Ostriches are the largest birds on Earth. They run incredibly fast and lay giant eggs, but they are too heavy to fly!"
      },
      {
        id: "anim_400_2",
        question: "I look like a small bear, sleep up to 18 hours a day, and only eat eucalyptus leaves. Who am I?",
        choices: ["A sloth", "A panda", "A koala", "A grizzly bear"],
        answer: "A koala",
        explanation: "A KOALA - Koalas are marsupials from Australia that spend almost their entire lives sleeping and munching on eucalyptus leaves!"
      },
      {
        id: "anim_400_3",
        question: "What marine animal is known to hold hands while sleeping to keep from drifting apart?",
        choices: ["A sea otter", "A dolphin", "A seal", "A penguin"],
        answer: "A sea otter",
        explanation: "A SEA OTTER - Sea otters hold hands in groups (called rafts) while sleeping to prevent currents from separating them!"
      }
    ],
    500: [
      {
        id: "anim_500_1",
        question: "I am a mammal that lays eggs, has a duck's bill, a beaver's tail, and webbed feet. Who am I?",
        choices: ["A platypus", "An otter", "A beaver", "A duck"],
        answer: "A platypus",
        explanation: "A PLATYPUS - The platypus is a unique egg-laying mammal (monotreme) with a beaver tail and a duck bill!"
      },
      {
        id: "anim_500_2",
        question: "I am the only mammal that cannot jump. Who am I?",
        choices: ["A sloth", "An elephant", "A hippo", "A rhino"],
        answer: "An elephant",
        explanation: "AN ELEPHANT - Elephants are so heavy and their leg bones are designed to support weight, making it impossible for them to jump!"
      },
      {
        id: "anim_500_3",
        question: "What animal has the largest eyes in the world?",
        choices: ["A giant squid", "A blue whale", "An owl", "An elephant"],
        answer: "A giant squid",
        explanation: "A GIANT SQUID - The giant squid's eyes can grow to the size of a basketball to help them see in the dark deep ocean!"
      }
    ]
  },
  "Everyday Mysteries": {
    100: [
      {
        id: "every_100_1",
        question: "I have hands but cannot clap, and a face but cannot smile. What am I?",
        choices: ["A mirror", "A clock", "A doll", "A smartphone"],
        answer: "A clock",
        explanation: "A CLOCK - A clock has an hour and minute 'hand', and a circular 'face', but it can't clap or smile!"
      },
      {
        id: "every_100_2",
        question: "I get wetter the more I dry. What am I?",
        choices: ["A sponge", "A towel", "A cloud", "A rain coat"],
        answer: "A towel",
        explanation: "A TOWEL - As you use a towel to dry yourself off, the towel absorbs the water and gets wetter!"
      },
      {
        id: "every_100_3",
        question: "What belongs to you, but other people use it much more than you do?",
        choices: ["Your name", "Your phone", "Your bicycle", "Your pencil"],
        answer: "Your name",
        explanation: "YOUR NAME - Your name belongs to you, but you rarely say it; instead, other people use it constantly to call or talk to you!"
      }
    ],
    200: [
      {
        id: "every_200_1",
        question: "I have a spine but no bones, and leaves but no branches. What am I?",
        choices: ["A book", "A fern", "A table", "A notebook"],
        answer: "A book",
        explanation: "A BOOK - A book's binding is called its 'spine', and its pages are called 'leaves', but it's not a plant or a skeleton!"
      },
      {
        id: "every_200_2",
        question: "The more of them you take, the more you leave behind. What are they?",
        choices: ["Footsteps", "Breaths", "Photos", "Fingerprints"],
        answer: "Footsteps",
        explanation: "FOOTSTEPS - Every time you take a step forward, you leave a footprint (step) behind you!"
      },
      {
        id: "every_200_3",
        question: "What has a thumb and four fingers but is not alive?",
        choices: ["A glove", "A hand puppet", "A shadow", "A skeleton"],
        answer: "A glove",
        explanation: "A GLOVE - A glove has a fabric thumb and four finger slots to fit your hand perfectly, but it is not alive!"
      }
    ],
    300: [
      {
        id: "every_300_1",
        question: "I have teeth but cannot bite. I help make your hair look nice and neat. What am I?",
        choices: ["A comb", "A zipper", "A saw", "A toothbrush"],
        answer: "A comb",
        explanation: "A COMB - A comb has rows of thin prongs called 'teeth', but it only styles your hair, it doesn't bite!"
      },
      {
        id: "every_300_2",
        question: "I am tall when I am young, and I am short when I am old. I glow in the dark to give you light. What am I?",
        choices: ["A flashlight", "A candle", "A tree", "A light bulb"],
        answer: "A candle",
        explanation: "A CANDLE - A new candle is tall, but as the flame burns the wax down over time, it gets shorter and shorter!"
      },
      {
        id: "every_300_3",
        question: "I have keys but no locks. I have space but no room. You can enter but can't go outside. What am I?",
        choices: ["A keyboard", "A diary", "A hotel", "A briefcase"],
        answer: "A keyboard",
        explanation: "A KEYBOARD - A computer keyboard has letter keys, a space bar, and an Enter key, but it cannot lock any doors!"
      }
    ],
    400: [
      {
        id: "every_400_1",
        question: "I have a neck but no head, and I wear a cap but have no hair. What am I?",
        choices: ["A bottle", "A shirt", "A pencil", "A mushroom"],
        answer: "A bottle",
        explanation: "A BOTTLE - A bottle has a narrow 'neck' leading to its opening, which is sealed by a bottle 'cap'!"
      },
      {
        id: "every_400_2",
        question: "I go up and down but never move. What am I?",
        choices: ["A staircase", "An escalator", "A roller coaster", "A playground slide"],
        answer: "A staircase",
        explanation: "A STARCASE - A staircase leads up and down to different floors, but it stays in the exact same spot!"
      },
      {
        id: "every_400_3",
        question: "What has one head, one foot, and four legs?",
        choices: ["A bed", "A table", "A dog", "A chair"],
        answer: "A bed",
        explanation: "A BED - A bed has a head (headboard), a foot (footboard), and four legs supporting it!"
      }
    ],
    500: [
      {
        id: "every_500_1",
        question: "What is full of holes but still holds water?",
        choices: ["A colander", "A sponge", "A net", "A bucket"],
        answer: "A sponge",
        explanation: "A SPONGE - A sponge has thousands of tiny holes, yet it is excellent at soaking up and holding water!"
      },
      {
        id: "every_500_2",
        question: "I have one eye, but I cannot see. I am very useful for sewing up clothes. What am I?",
        choices: ["A needle", "A hurricane", "A potato", "A button"],
        answer: "A needle",
        explanation: "A NEEDLE - The small loop at the end of a sewing needle where the thread goes is called the 'eye', but it has no vision!"
      },
      {
        id: "every_500_3",
        question: "What is easy to get into but extremely hard to get out of?",
        choices: ["Trouble", "A box", "A sweater", "A dream"],
        answer: "Trouble",
        explanation: "TROUBLE - It is very easy to make a bad choice and get into trouble, but it takes a lot of hard work and honesty to get out of it!"
      }
    ]
  },
  "Nature & Earth": {
    100: [
      {
        id: "nat_100_1",
        question: "I am hot, bright, and shine in the day. Plants love me. What am I?",
        choices: ["The Sun", "A campfire", "The Moon", "A lightning bolt"],
        answer: "The Sun",
        explanation: "THE SUN - The Sun is a giant star that heats our solar system and helps plants grow through photosynthesis!"
      },
      {
        id: "nat_100_2",
        question: "I fall from the clouds but never get hurt. Plants drink me. What am I?",
        choices: ["Rain", "Snow", "Leaves", "Sleet"],
        answer: "Rain",
        explanation: "RAIN - Rain drops fall thousands of feet from clouds, bringing crucial water to plants and animals!"
      },
      {
        id: "nat_100_3",
        question: "I am a beautiful green leaf on a tree. What color am I in the fall?",
        choices: ["Red, orange, or yellow", "Green", "Blue", "Purple"],
        answer: "Red, orange, or yellow",
        explanation: "RED, ORANGE, OR YELLOW - In autumn, leaves stop making green chlorophyll and reveal beautiful warm colors!"
      }
    ],
    200: [
      {
        id: "nat_200_1",
        question: "I have no voice, but I can whisper. I have no hands, but I can shake trees. What am I?",
        choices: ["The wind", "An earthquake", "A ghost", "A bird"],
        answer: "The wind",
        explanation: "THE WIND - You can hear the wind 'whispering' through the grass, and a strong gust can shake tree branches!"
      },
      {
        id: "nat_200_2",
        question: "I am a giant ball of rock that glows at night. I change my shape throughout the month. What am I?",
        choices: ["The Moon", "A comet", "Venus", "A shooting star"],
        answer: "The Moon",
        explanation: "THE MOON - The Moon orbits Earth and reflects sunlight. Its phases make it look like it is changing shape!"
      },
      {
        id: "nat_200_3",
        question: "What has bark but no bite, and leaves but never goes anywhere?",
        choices: ["A tree", "A book", "A dog", "A plant"],
        answer: "A tree",
        explanation: "A TREE - A tree has wooden 'bark' protecting its trunk, and green 'leaves' growing on its branches!"
      }
    ],
    300: [
      {
        id: "nat_300_1",
        question: "I am a cloud that sits very close to the ground, making it hard for you to see. What am I?",
        choices: ["Smoke", "Fog", "Sleet", "Haze"],
        answer: "Fog",
        explanation: "FOG - Fog is a low-lying cloud of tiny water droplets that forms near the ground and reduces visibility!"
      },
      {
        id: "nat_300_2",
        question: "I look like a white fluffy ball of cotton in the sky, but I am actually made of water. What am I?",
        choices: ["A cloud", "A snowflake", "A hot air balloon", "Fog"],
        answer: "A cloud",
        explanation: "A CLOUD - Clouds form when water vapor rises, cools, and condenses into visible clusters of droplets in the sky!"
      },
      {
        id: "nat_300_3",
        question: "What rises in the morning, sets in the evening, and makes your shadow very long?",
        choices: ["The Sun", "The Moon", "A cloud", "A hot air balloon"],
        answer: "The Sun",
        explanation: "THE SUN - The Sun rises in the east and sets in the west. When it is low near the horizon, it casts very long shadows!"
      }
    ],
    400: [
      {
        id: "nat_400_1",
        question: "I can build castles but I am tiny grains. I slip through your fingers at the beach. What am I?",
        choices: ["Sand", "Water", "Shells", "Mud"],
        answer: "Sand",
        explanation: "SAND - Sand consists of tiny rocks and minerals that can be packed with water to build structures, like sandcastles!"
      },
      {
        id: "nat_400_2",
        question: "I grow underwater, I have no roots, but I produce most of the oxygen you breathe. What am I?",
        choices: ["Algae & Phytoplankton", "Sea anemones", "Jellyfish", "Corals"],
        answer: "Algae & Phytoplankton",
        explanation: "ALGAE & PHYTOPLANKTON - These tiny ocean plants produce over 50% of the world's oxygen through photosynthesis!"
      },
      {
        id: "nat_400_3",
        question: "I am a frozen star-shaped crystal that falls from winter clouds. No two of me are exactly alike. What am I?",
        choices: ["A snowflake", "An icicle", "A hailstone", "Frost"],
        answer: "A snowflake",
        explanation: "A SNOWFLAKE - Every single snowflake has a unique, beautiful geometric structure made of frozen water crystal!"
      }
    ],
    500: [
      {
        id: "nat_500_1",
        question: "I am a rock that floats on water. I am formed from hot volcano lava. What am I?",
        choices: ["Pumice", "Granite", "Basalt", "Obsidian"],
        answer: "Pumice",
        explanation: "PUMICE - Pumice is a volcanic rock filled with tiny air bubbles, making it lightweight enough to float!"
      },
      {
        id: "nat_500_2",
        question: "I am a bridge made of colors that nobody can cross. What am I?",
        choices: ["A rainbow", "The Northern Lights", "A bridge in Venice", "A sunset"],
        answer: "A rainbow",
        explanation: "A RAINBOW - A rainbow is an optical phenomenon made of light refracting in water droplets. It looks like a bridge, but has no physical form!"
      },
      {
        id: "nat_500_3",
        question: "What goes up when rain comes down?",
        choices: ["An umbrella", "A cloud", "A kite", "A balloon"],
        answer: "An umbrella",
        explanation: "AN UMBRELLA - When rain falls down, people open umbrellas and raise them up to stay dry!"
      }
    ]
  },
  "Math & Logic": {
    100: [
      {
        id: "math_100_1",
        question: "Which 3D shape looks exactly like a can of soup or a soda?",
        choices: ["A cylinder", "A sphere", "A cone", "A pyramid"],
        answer: "A cylinder",
        explanation: "A CYLINDER - A cylinder has two flat circular bases connected by a curved smooth surface, just like a can!"
      },
      {
        id: "math_100_2",
        question: "If you multiply any number by me, the answer is always zero. What number am I?",
        choices: ["0", "1", "10", "Infinity"],
        answer: "0",
        explanation: "0 - Multiplying any quantity by zero means you have zero groups of that quantity, so the result is always zero!"
      },
      {
        id: "math_100_3",
        question: "How many sides does a rectangle have?",
        choices: ["4", "3", "5", "6"],
        answer: "4",
        explanation: "4 - A rectangle always has exactly four straight sides and four 90-degree corners!"
      }
    ],
    200: [
      {
        id: "math_200_1",
        question: "I am an odd number. Take away a letter and I become even. What number am I?",
        choices: ["Seven", "Eleven", "Three", "Nine"],
        answer: "Seven",
        explanation: "SEVEN - The word is S-E-V-E-N. Remove the letter 'S' and it spells E-V-E-N!"
      },
      {
        id: "math_200_2",
        question: "A farmer has 17 sheep. All but 9 run away. How many sheep does he have left?",
        choices: ["9", "8", "17", "0"],
        answer: "9",
        explanation: "9 - The riddle says 'All BUT nine run away', which means the nine sheep that did NOT run away are still there!"
      },
      {
        id: "math_200_3",
        question: "If you have 3 apples and you take away 2, how many do you have?",
        choices: ["2", "1", "3", "0"],
        answer: "2",
        explanation: "2 - If YOU take away 2 apples, those 2 apples are now in your hands, so you have 2!"
      }
    ],
    300: [
      {
        id: "math_300_1",
        question: "Two fathers and two sons are in a car, yet there are only three people. How is this possible?",
        choices: ["They are a grandfather, father, and son", "One of them is a step-father", "They are brothers", "It is a trick question"],
        answer: "They are a grandfather, father, and son",
        explanation: "GRANDFATHER, FATHER, AND SON - The grandfather is a father, the father is both a son and a father, and the young boy is a son. That's two fathers and two sons!"
      },
      {
        id: "math_300_2",
        question: "What is the next number in the pattern: 2, 4, 8, 16, ...?",
        choices: ["32", "20", "24", "64"],
        answer: "32",
        explanation: "32 - Each number in this sequence is multiplied by 2 (doubled) to get the next number: 16 x 2 = 32!"
      },
      {
        id: "math_300_3",
        question: "What mathematical symbol can you place between 5 and 6 to get a number larger than 5 but smaller than 6?",
        choices: ["A decimal point", "A plus sign", "A minus sign", "A division sign"],
        answer: "A decimal point",
        explanation: "A DECIMAL POINT - Placing a decimal point between them gives 5.6, which is strictly between 5 and 6!"
      }
    ],
    400: [
      {
        id: "math_400_1",
        question: "Divide 5 apples among 5 kids so each gets one, but one apple must stay in the basket. How?",
        choices: ["Give the fifth child their apple still inside the basket", "Cut the apples in half", "Keep one apple for yourself", "It is impossible"],
        answer: "Give the fifth child their apple still inside the basket",
        explanation: "IN THE BASKET - You give four apples to four children, and give the fifth apple to the last child while it is still in the basket!"
      },
      {
        id: "math_400_2",
        question: "If a digital clock reads 3:15, what is the angle between the hour and minute hands?",
        choices: ["7.5 degrees", "0 degrees", "90 degrees", "15 degrees"],
        answer: "7.5 degrees",
        explanation: "7.5 DEGREES - At 3:15, the minute hand is on the 3. But the hour hand has moved 1/4 of the way toward the 4. Since each hour is 30 degrees, 1/4 of 30 is 7.5 degrees!"
      },
      {
        id: "math_400_3",
        question: "I am a three-digit number. My tens digit is 6. My hundreds digit is 3 less than my tens. My ones digit is 2 more than my hundreds. What am I?",
        choices: ["365", "264", "466", "163"],
        answer: "365",
        explanation: "365 - Let's check: Tens digit is 6. Hundreds digit (3) is 6 - 3 = 3. Ones digit (5) is 3 + 2 = 5. The number is 365!"
      }
    ],
    500: [
      {
        id: "math_500_1",
        question: "Using only addition, how can you add eight 8s to get the number 1,000?",
        choices: ["888 + 88 + 8 + 8 + 8", "888 + 888 + 8 + 8", "88 + 88 + 88 + 88", "8 + 8 + 8 + 8 + 8 + 8 + 8 + 8"],
        answer: "888 + 88 + 8 + 8 + 8",
        explanation: "888 + 88 + 8 + 8 + 8 - If you add these numbers together: 888 + 88 = 976, plus three 8s (24) equals exactly 1,000!"
      },
      {
        id: "math_500_2",
        question: "I am a three-digit number. My tens digit is 5 more than my ones. My hundreds is 8 less than my tens. What am I?",
        choices: ["194", "272", "383", "491"],
        answer: "194",
        explanation: "194 - Let's check: The tens digit (9) is 5 more than the ones digit (4). The hundreds digit (1) is 8 less than the tens digit (9). The number is 194!"
      },
      {
        id: "math_500_3",
        question: "A sphere has how many flat faces?",
        choices: ["0", "1", "2", "infinite"],
        answer: "0",
        explanation: "0 - A sphere (like a marble or basketball) is completely curved and has zero flat faces!"
      }
    ]
  },
  "Trick Questions": {
    100: [
      {
        id: "trick_100_1",
        question: "What goes up but never comes down?",
        choices: ["Your age", "A balloon", "An airplane", "A kite"],
        answer: "Your age",
        explanation: "YOUR AGE - As time passes, your age keeps increasing and going up, but it can never go backward or down!"
      },
      {
        id: "trick_100_2",
        question: "If you pass the person in second place in a race, what place are you in?",
        choices: ["Second place", "First place", "Third place", "Last place"],
        answer: "Second place",
        explanation: "SECOND PLACE - You took the spot of the person who was in second, so now you are in second place, and they are behind you!"
      },
      {
        id: "trick_100_3",
        question: "What has words but never speaks a single sound?",
        choices: ["A book", "A radio", "A mime", "A television"],
        answer: "A book",
        explanation: "A BOOK - A book is packed with thousands of words, but it has no mouth so it stays completely quiet!"
      }
    ],
    200: [
      {
        id: "trick_200_1",
        question: "What has a head and a tail but no body?",
        choices: ["A coin", "A snake", "A comet", "A shadow"],
        answer: "A coin",
        explanation: "A COIN - A coin has a 'heads' side and a 'tails' side, but it is just a flat piece of metal with no actual body!"
      },
      {
        id: "trick_200_2",
        question: "Which month of the year has 28 days?",
        choices: ["All of them", "February only", "January", "None of them"],
        answer: "All of them",
        explanation: "ALL OF THEM - Every single month has at least 28 days! February has only 28 (or 29), but the others have 30 or 31!"
      },
      {
        id: "trick_200_3",
        question: "What can you hold in your right hand but never in your left hand?",
        choices: ["Your left elbow", "Your left hand", "A pen", "A phone"],
        answer: "YOUR LEFT ELBOW - You can easily grab your left elbow with your right hand, but it is physically impossible to hold it with your left hand!"
      }
    ],
    300: [
      {
        id: "trick_300_1",
        question: "A man pushes his car, stops at a hotel, and immediately knows he is bankrupt. Why?",
        choices: ["He is playing Monopoly", "He spent all his money on gas", "The hotel was too expensive", "His car broke down"],
        answer: "He is playing Monopoly",
        explanation: "HE IS PLAYING MONOPOLY - The car is a tiny game piece he pushes around the board. When he lands on a hotel, he can't afford it and goes 'bankrupt' in the game!"
      },
      {
        id: "trick_300_2",
        question: "Imagine you are in a dark room filling with water. No windows or doors. How do you escape?",
        choices: ["Stop imagining!", "Swim to the top", "Drink the water", "Use a flashlight"],
        answer: "Stop imagining!",
        explanation: "STOP IMAGINING - The riddle starts with 'Imagine you are...', so if you just stop imagining it, you are instantly safe!"
      },
      {
        id: "trick_300_3",
        question: "A boy is twice as old as his sister. If the boy is 6, how old will the sister be when the boy is 10?",
        choices: ["7", "8", "5", "10"],
        answer: "7",
        explanation: "7 - When the boy is 6, his sister is half his age, so she is 3 (3 years younger). When the boy becomes 10, his sister will still be 3 years younger, which makes her 7!"
      }
    ],
    400: [
      {
        id: "trick_400_1",
        question: "If you throw a red stone into the blue sea, what does it become?",
        choices: ["Wet", "Purple", "Sunk", "A chemical reaction"],
        answer: "Wet",
        explanation: "WET - It doesn't matter what color the stone or sea is. Throwing a stone into water simply makes it wet!"
      },
      {
        id: "trick_400_2",
        question: "Mary's father has five daughters: Nana, Nene, Nini, Nono, and... who is the fifth?",
        choices: ["Mary", "Nunu", "Nancy", "Nina"],
        answer: "Mary",
        explanation: "MARY - Read the riddle carefully: 'Mary's father has five daughters...'. The fifth daughter is Mary herself!"
      },
      {
        id: "trick_400_3",
        question: "What side of a dog has the most fur?",
        choices: ["The outside", "The top", "The back", "The inside"],
        answer: "The outside",
        explanation: "THE OUTSIDE - The outside of a dog has all the fur, while the inside has none!"
      }
    ],
    500: [
      {
        id: "trick_500_1",
        question: "What gets bigger the more you take away from it?",
        choices: ["A hole", "A shadow", "A balloon", "A mountain"],
        answer: "A hole",
        explanation: "A HOLE - The more dirt you dig out and take away, the larger the hole becomes!"
      },
      {
        id: "trick_500_2",
        question: "If two is company and three is a crowd, what are four and five?",
        choices: ["Nine", "A party", "Too many", "A group"],
        answer: "Nine",
        explanation: "NINE - Four plus five is simply nine! It is a mathematical trick question!"
      },
      {
        id: "trick_500_3",
        question: "If 10 people took 10 hours to build a brick wall, how long would it take 5 people to build the exact same wall?",
        choices: ["Zero hours", "20 hours", "5 hours", "10 hours"],
        answer: "Zero hours",
        explanation: "ZERO HOURS - The wall is already built by the first 10 people, so it takes 5 people zero hours to build it!"
      }
    ]
  }
};

const TIE_BREAKER_POOL = [
  {
    id: "tie_1",
    question: "What gets bigger the more you take away from it?",
    choices: ["A hole", "A shadow", "A balloon", "A mountain"],
    answer: "A hole",
    explanation: "A HOLE - The more dirt you dig out and take away, the larger the hole becomes!"
  },
  {
    id: "tie_2",
    question: "I have branches, but no fruit, trunk, or leaves. What am I?",
    choices: ["A bank", "A river", "A road", "A family tree"],
    answer: "A bank",
    explanation: "A BANK - A bank has financial 'branches' (different locations), but it isn't a tree so it has no leaves or wood!"
  },
  {
    id: "tie_3",
    question: "What can you catch but never throw?",
    choices: ["A cold", "A tennis ball", "A shadow", "A snowflake"],
    answer: "A cold",
    explanation: "A COLD - You can 'catch' a cold or a sickness from someone else, but you can't pick it up and throw it!"
  },
  {
    id: "tie_4",
    question: "What has to be broken before you can use it?",
    choices: ["An egg", "A lock", "A promise", "A mirror"],
    answer: "An egg",
    explanation: "AN EGG - You must crack or break an egg shell before you can cook or bake with it!"
  },
  {
    id: "tie_5",
    question: "I am clean when I am black, and dirty when I am white. What am I?",
    choices: ["A blackboard", "A white paper", "A cloud", "A shadow"],
    answer: "A blackboard",
    explanation: "A BLACKBOARD - When a blackboard is clean, it is black. When you write on it with white chalk and make it dirty, it becomes white!"
  },
  {
    id: "tie_6",
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    choices: ["An echo", "A whistle", "A radio", "A cloud"],
    answer: "An echo",
    explanation: "AN ECHO - An echo repeats the sounds you make without having its own mouth or ears, and it travels through the air!"
  },
  {
    id: "tie_7",
    question: "I have cities but no houses, mountains but no trees, and water but no fish. What am I?",
    choices: ["A map", "A globe", "A drawing", "A storybook"],
    answer: "A map",
    explanation: "A MAP - A map shows cities, mountains, and oceans, but they are just drawings so they don't have real houses, trees, or fish!"
  },
  {
    id: "tie_8",
    question: "What has a head, a tail, is copper-brown, but has no legs?",
    choices: ["A penny", "A snake", "A caterpillar", "A monkey"],
    answer: "A penny",
    explanation: "A PENNY - A penny coin is copper-brown, has a 'heads' side and a 'tails' side, and has no legs!"
  },
  {
    id: "tie_9",
    question: "You see a boat filled with people. It has not sunk, but when you look again you don't see a single person on it. Why?",
    choices: ["They are all married couples", "They fell off the boat", "They went below deck", "It was a ghost ship"],
    answer: "They are all married couples",
    explanation: "THEY ARE ALL MARRIED COUPLES - Since they are all married, there is not a single (unmarried) person on the boat!"
  },
  {
    id: "tie_10",
    question: "What word contains all 26 letters of the alphabet but only has 7 letters?",
    choices: ["Alphabet", "Letters", "Keyboard", "Dictionary"],
    answer: "Alphabet",
    explanation: "ALPHABET - The word A-L-P-H-A-B-E-T contains all the letters of the alphabet by definition, and the word itself has exactly 7 letters!"
  }
];

// Helper to get active riddles for a game session
function generateGameSessionRiddles() {
  const allCategories = Object.keys(RIDDLE_POOL);
  // Shuffle categories
  const shuffledCats = allCategories.sort(() => 0.5 - Math.random());
  // Pick exactly 4 categories
  const selectedCategories = shuffledCats.slice(0, 4);

  const sessionRiddles = {};
  const difficulties = [100, 200, 300, 400, 500];

  selectedCategories.forEach(cat => {
    sessionRiddles[cat] = {};
    difficulties.forEach(diff => {
      const riddlesForDiff = RIDDLE_POOL[cat][diff];
      // Pick one randomly
      const picked = riddlesForDiff[Math.floor(Math.random() * riddlesForDiff.length)];
      sessionRiddles[cat][diff] = picked;
    });
  });

  return {
    categories: selectedCategories,
    riddles: sessionRiddles
  };
}

// Export for module or global use
if (typeof module !== "undefined" && module.exports) {
  module.exports = { RIDDLE_POOL, TIE_BREAKER_POOL, generateGameSessionRiddles };
}
