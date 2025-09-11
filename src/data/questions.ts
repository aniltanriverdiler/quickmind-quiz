// Types
export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};
export type Difficulty = "easy" | "medium" | "hard";
export type Category = "technology" | "history" | "sports";

// Dataset with initial example questions
export const questions: Record<Category, Record<Difficulty, Question[]>> = {
  technology: {
    easy: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "HyperLinks and Text Markup Language",
          "Hyper Transfer Markup Language",
        ],
        correctAnswer: "Hyper Text Markup Language",
      },
      {
        question: "Which company developed the Java Programming Language?",
        options: ["Microsoft", "Sun Microsystem", "Apple", "Google"],
        correctAnswer: "Sun Microsystems",
      },
      {
        question: "Which language is primarily used for styling web pages?",
        options: ["HTML", "CSS", "Python", "C++"],
        correctAnswer: "CSS",
      },
      {
        question: "What does CPU stand for?",
        options: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Performance Utility",
          "Core Processing Utility",
        ],
        correctAnswer: "Central Processing Unit",
      },
      {
        question: "Which device is used to input text into a computer?",
        options: ["Monitor", "Keyboard", "Printer", "Speaker"],
        correctAnswer: "Keyboard",
      },
      {
        question: "What does URL stand for?",
        options: [
          "Uniform Resource Locator",
          "Universal Routing Link",
          "Unified Resource Link",
          "Universal Resource Locator",
        ],
        correctAnswer: "Uniform Resource Locator",
      },
      {
        question: "Which company makes the Android operating system?",
        options: ["Apple", "Microsoft", "Google", "IBM"],
        correctAnswer: "Google",
      },
      {
        question: "What does Wi‑Fi allow devices to do?",
        options: [
          "Print documents",
          "Connect wirelessly to a network",
          "Charge wirelessly",
          "Store more memory",
        ],
        correctAnswer: "Connect wirelessly to a network",
      },
      {
        question:
          "Which file extension is typically used for JavaScript files?",
        options: [".css", ".js", ".html", ".json"],
        correctAnswer: ".js",
      },
      {
        question: "What is the most common output device for computers?",
        options: ["Monitor", "Scanner", "Microphone", "Joystick"],
        correctAnswer: "Monitor",
      },
    ],
    medium: [
      {
        question: "What is the main purpose of CSS?",
        options: [
          "Structure web pages",
          "Style web pages",
          "Run scripts",
          "Store data",
        ],
        correctAnswer: "Style web pages",
      },
      {
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "MongoDB", "PostgreSQL", "OracleDB"],
        correctAnswer: "MongoDB",
      },
      {
        question: "Which protocol is used to secure data on the web?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        correctAnswer: "HTTPS",
      },
      {
        question: "What does the 'G' stand for in 5G networks?",
        options: ["Generation", "Gigabit", "Global", "Gateway"],
        correctAnswer: "Generation",
      },
      {
        question: "Which command initializes a new Git repository?",
        options: ["git init", "git start", "git new", "git create"],
        correctAnswer: "git init",
      },
      {
        question:
          "What is the time complexity of binary search on a sorted array?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctAnswer: "O(log n)",
      },
      {
        question:
          "Which of the following is a strongly typed superset of JavaScript?",
        options: ["Flow", "CoffeeScript", "TypeScript", "Elm"],
        correctAnswer: "TypeScript",
      },
      {
        question: "Which HTML element is used to include external JavaScript?",
        options: ["<script>", "<style>", "<link>", "<js>"],
        correctAnswer: "<script>",
      },
      {
        question: "In databases, what does SQL stand for?",
        options: [
          "Structured Query Language",
          "Sequential Query Language",
          "Standard Question Language",
          "System Query Logic",
        ],
        correctAnswer: "Structured Query Language",
      },
      {
        question:
          "Which tool is commonly used to bundle modern JavaScript applications?",
        options: ["Webpack", "Nginx", "Postman", "Babel"],
        correctAnswer: "Webpack",
      },
    ],
    hard: [
      {
        question: "What does the acronym 'REST' stand for in RESTful APIs?'",
        options: [
          "Representational State Transfer",
          "Remote Execution Service Technology",
          "Rapic Endpoint Scripting Techinique",
          "Realiable Server Transfer",
        ],
        correctAnswer: "Representational State Transfer",
      },
      {
        question: "Which of these is NOT a Javascript framework?",
        options: ["React", "Angular", "Django", "Vue"],
        correctAnswer: "Django",
      },
      {
        question:
          "Which consistency model is used by Dynamo-style distributed databases?",
        options: [
          "Strong consistency",
          "Eventual consistency",
          "Linearizability",
          "Monotonic consistency",
        ],
        correctAnswer: "Eventual consistency",
      },
      {
        question: "Which algorithm is used for public‑key encryption?",
        options: ["AES", "SHA-256", "RSA", "MD5"],
        correctAnswer: "RSA",
      },
      {
        question:
          "In operating systems, which scheduling algorithm uses time slices?",
        options: [
          "First-Come First-Served",
          "Round Robin",
          "Shortest Job First",
          "Priority Scheduling",
        ],
        correctAnswer: "Round Robin",
      },
      {
        question:
          "Which CAP theorem properties can a partitioned system guarantee simultaneously?",
        options: [
          "Consistency and Availability",
          "Availability and Partition tolerance",
          "Consistency and Partition tolerance",
          "All three always",
        ],
        correctAnswer: "Availability and Partition tolerance",
      },
      {
        question:
          "What is the amortized time complexity of push and pop on a dynamic array (vector)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(1)",
      },
      {
        question:
          "Which data structure efficiently implements a priority queue?",
        options: ["Stack", "Binary Heap", "Hash Table", "Trie"],
        correctAnswer: "Binary Heap",
      },
      {
        question: "Which technique prevents SQL injection most effectively?",
        options: [
          "Manual string concatenation",
          "Parameterized queries",
          "Escaping only quotes",
          "Client-side validation only",
        ],
        correctAnswer: "Parameterized queries",
      },
      {
        question:
          "Which algorithm is commonly used for shortest path in weighted graphs without negative edges?",
        options: ["DFS", "BFS", "Dijkstra's algorithm", "Kruskal's algorithm"],
        correctAnswer: "Dijkstra's algorithm",
      },
    ],
  },
  history: {
    easy: [
      {
        question: "Who is the first President of the United States?",
        options: [
          "George Washington",
          "Thomas Jefferson",
          "Abraham Lincoln",
          "John Adams",
        ],
        correctAnswer: "George Washington",
      },
      {
        question: "In which year did World War II end?",
        options: ["1940", "1945", "1950", "1939"],
        correctAnswer: "1945",
      },
      {
        question: "Which ancient civilization built the pyramids of Giza?",
        options: ["Romans", "Greeks", "Egyptians", "Mayans"],
        correctAnswer: "Egyptians",
      },
      {
        question: "Who discovered penicillin?",
        options: [
          "Alexander Fleming",
          "Marie Curie",
          "Louis Pasteur",
          "Isaac Newton",
        ],
        correctAnswer: "Alexander Fleming",
      },
      {
        question: "Which city was the capital of the Byzantine Empire?",
        options: ["Rome", "Constantinople", "Athens", "Carthage"],
        correctAnswer: "Constantinople",
      },
      {
        question: "The Magna Carta was signed in which country?",
        options: ["France", "Germany", "England", "Spain"],
        correctAnswer: "England",
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
        correctAnswer: "Leonardo da Vinci",
      },
      {
        question:
          "Which war was fought between the North and South regions of the United States?",
        options: [
          "World War I",
          "The Civil War",
          "The Revolutionary War",
          "The Cold War",
        ],
        correctAnswer: "The Civil War",
      },
      {
        question: "Who was known as the 'Maid of Orléans'?",
        options: ["Cleopatra", "Joan of Arc", "Boudica", "Catherine the Great"],
        correctAnswer: "Joan of Arc",
      },
      {
        question: "The Great Wall is located in which country?",
        options: ["Japan", "China", "India", "Korea"],
        correctAnswer: "China",
      },
    ],
    medium: [
      {
        question: "Who wrote the 'I Have a Dream' speech?",
        options: [
          "Malcolm X",
          "Martin Luther King Jr.",
          "Frederick Douglass",
          "Rosa Parks",
        ],
        correctAnswer: "Martin Luther King Jr.",
      },
      {
        question: "The French Revolution began in which year?",
        options: ["1789", "1799", "1775", "1765"],
        correctAnswer: "1789",
      },
      {
        question: "Which empire was ruled by Genghis Khan?",
        options: [
          "Ottoman Empire",
          "Mongol Empire",
          "Roman Empire",
          "Persian Empire",
        ],
        correctAnswer: "Mongol Empire",
      },
      {
        question: "What was the primary purpose of the Silk Road?",
        options: [
          "Religious pilgrimage",
          "Military conquest",
          "Trade between East and West",
          "Scientific exploration",
        ],
        correctAnswer: "Trade between East and West",
      },
      {
        question: "Which dynasty built much of the Great Wall of China?",
        options: ["Qin", "Han", "Tang", "Song"],
        correctAnswer: "Qin",
      },
      {
        question: "Who was the first emperor of a unified China?",
        options: ["Qin Shi Huang", "Kublai Khan", "Sun Yat-sen", "Mao Zedong"],
        correctAnswer: "Qin Shi Huang",
      },
      {
        question:
          "Which document proclaimed the independence of the United States?",
        options: [
          "Bill of Rights",
          "Declaration of Independence",
          "Articles of Confederation",
          "Federalist Papers",
        ],
        correctAnswer: "Declaration of Independence",
      },
      {
        question: "The Renaissance began in which European country?",
        options: ["France", "Italy", "Germany", "Spain"],
        correctAnswer: "Italy",
      },
      {
        question:
          "Which explorer completed the first circumnavigation of the Earth?",
        options: [
          "Christopher Columbus",
          "Ferdinand Magellan",
          "James Cook",
          "Vasco da Gama",
        ],
        correctAnswer: "Ferdinand Magellan",
      },
      {
        question:
          "Who was the British Prime Minister during most of World War II?",
        options: [
          "Neville Chamberlain",
          "Winston Churchill",
          "Clement Attlee",
          "David Lloyd George",
        ],
        correctAnswer: "Winston Churchill",
      },
    ],
    hard: [
      {
        question: "Who was the last Emperor of the Roman Empire?",
        options: [
          "Romulus Augustulus",
          "Julius Caesar",
          "Constantine I",
          "Nero",
        ],
        correctAnswer: "Romulus Augustulus",
      },
      {
        question: "Which treaty ended World War I?",
        options: [
          "Treaty of Versailles",
          "Treaty of Paris",
          "Treaty of London",
          "Treaty of Berlin",
        ],
        correctAnswer: "Treaty of Versailles",
      },
      {
        question:
          "In which year did the Byzantine Empire fall to the Ottomans?",
        options: ["1204", "1299", "1453", "1517"],
        correctAnswer: "1453",
      },
      {
        question: "Which battle is often considered Napoleon's final defeat?",
        options: ["Austerlitz", "Leipzig", "Trafalgar", "Waterloo"],
        correctAnswer: "Waterloo",
      },
      {
        question:
          "What was the code name for the Allied invasion of Normandy in 1944?",
        options: [
          "Operation Torch",
          "Operation Overlord",
          "Operation Barbarossa",
          "Operation Market Garden",
        ],
        correctAnswer: "Operation Overlord",
      },
      {
        question: "Which civilization developed cuneiform writing?",
        options: ["Egyptians", "Sumerians", "Phoenicians", "Hittites"],
        correctAnswer: "Sumerians",
      },
      {
        question:
          "Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
        options: [
          "Joseph Stalin",
          "Nikita Khrushchev",
          "Leonid Brezhnev",
          "Mikhail Gorbachev",
        ],
        correctAnswer: "Nikita Khrushchev",
      },
      {
        question: "Which war is associated with the Thirty Years' War?",
        options: [
          "A series of conflicts in Central Europe",
          "The colonization of the Americas",
          "The Napoleonic Wars",
          "The Hundred Years' War",
        ],
        correctAnswer: "A series of conflicts in Central Europe",
      },
      {
        question:
          "Which treaty established the European Union's foundational structure in 1993?",
        options: [
          "Treaty of Maastricht",
          "Treaty of Rome",
          "Treaty of Lisbon",
          "Treaty of Nice",
        ],
        correctAnswer: "Treaty of Maastricht",
      },
      {
        question: "Who authored 'The Prince', a treatise on political theory?",
        options: [
          "Thomas Hobbes",
          "Niccolò Machiavelli",
          "John Locke",
          "Jean-Jacques Rousseau",
        ],
        correctAnswer: "Niccolò Machiavelli",
      },
    ],
  },
  sports: {
    easy: [
      {
        question: "How many players are there in a soccer team on the field?",
        options: ["9", "10", "11", "12"],
        correctAnswer: "11",
      },
      {
        question: "In tennis, what is the score called when the game is 40-40?",
        options: ["Deuce", "Advantage", "Love", "Match Point"],
        correctAnswer: "Deuce",
      },
      {
        question: "In which sport is the term 'home run' used?",
        options: ["Cricket", "Baseball", "Rugby", "Hockey"],
        correctAnswer: "Baseball",
      },
      {
        question: "How many points is a touchdown worth in American football?",
        options: ["3", "6", "7", "8"],
        correctAnswer: "6",
      },
      {
        question: "Which sport uses a shuttlecock?",
        options: ["Tennis", "Badminton", "Squash", "Table Tennis"],
        correctAnswer: "Badminton",
      },
      {
        question: "What is the playing surface called in ice hockey?",
        options: ["Court", "Rink", "Pitch", "Table"],
        correctAnswer: "Rink",
      },
      {
        question: "Which country is famous for the sport of sumo wrestling?",
        options: ["China", "Korea", "Japan", "Thailand"],
        correctAnswer: "Japan",
      },
      {
        question: "How long is a marathon race?",
        options: ["21.0975 km", "30 km", "42.195 km", "50 km"],
        correctAnswer: "42.195 km",
      },
      {
        question: "Which sport is associated with Wimbledon?",
        options: ["Golf", "Cricket", "Tennis", "Rugby"],
        correctAnswer: "Tennis",
      },
      {
        question: "How many rings are there on the Olympic flag?",
        options: ["4", "5", "6", "7"],
        correctAnswer: "5",
      },
    ],
    medium: [
      {
        question: "Which country hosted the 2016 Summer Olympics?",
        options: ["Brazil", "Russia", "Japan", "Australia"],
        correctAnswer: "Brazil",
      },
      {
        question: "In basketball, how many points is a free throw worth?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "1",
      },
      {
        question: "Which nation has won the most FIFA World Cups?",
        options: ["Germany", "Italy", "Brazil", "Argentina"],
        correctAnswer: "Brazil",
      },
      {
        question:
          "Which tennis player has the most men's Grand Slam singles titles (as of 2024)?",
        options: [
          "Rafael Nadal",
          "Novak Djokovic",
          "Roger Federer",
          "Andy Murray",
        ],
        correctAnswer: "Novak Djokovic",
      },
      {
        question:
          "In cricket, how many runs is a boundary worth when the ball rolls to the rope?",
        options: ["4", "6", "2", "3"],
        correctAnswer: "4",
      },
      {
        question: "Which city hosts the Boston Marathon?",
        options: ["New York", "Boston", "Chicago", "Philadelphia"],
        correctAnswer: "Boston",
      },
      {
        question: "Which country won the Rugby World Cup in 2019?",
        options: ["England", "South Africa", "New Zealand", "Australia"],
        correctAnswer: "South Africa",
      },
      {
        question:
          "How many minutes is a standard professional soccer match (excluding added time)?",
        options: ["80", "90", "100", "120"],
        correctAnswer: "90",
      },
      {
        question: "Which golf tournament is known as 'The Masters'?",
        options: [
          "US Open",
          "The Masters",
          "The Open Championship",
          "PGA Championship",
        ],
        correctAnswer: "The Masters",
      },
      {
        question: "What is the maximum break in snooker without fouls?",
        options: ["147", "155", "140", "150"],
        correctAnswer: "147",
      },
    ],
    hard: [
      {
        question: "Which Formula 1 driver won the 2020 World Championship?",
        options: [
          "Lewis Hamilton",
          "Sebastian Vettel",
          "Max Verstappen",
          "Valtteri Bottas",
        ],
        correctAnswer: "Lewis Hamilton",
      },
      {
        question: "In which year was the first modern Olympic Games held?",
        options: ["1896", "1900", "1912", "1888"],
        correctAnswer: "1896",
      },
      {
        question: "Which country won the first FIFA World Cup in 1930?",
        options: ["Brazil", "Uruguay", "Argentina", "France"],
        correctAnswer: "Uruguay",
      },
      {
        question: "In chess, what is the only piece that can jump over others?",
        options: ["Bishop", "Knight", "Rook", "Queen"],
        correctAnswer: "Knight",
      },
      {
        question: "Which marathon world record (men) fell in 2023 in Berlin?",
        options: [
          "2:01:09 by Eliud Kipchoge",
          "2:00:35 by Kelvin Kiptum",
          "2:02:57 by Haile Gebrselassie",
          "2:01:41 by Kenenisa Bekele",
        ],
        correctAnswer: "2:00:35 by Kelvin Kiptum",
      },
      {
        question:
          "Which NBA team completed a 73–9 regular season record in 2015–16?",
        options: [
          "Chicago Bulls",
          "Los Angeles Lakers",
          "Golden State Warriors",
          "San Antonio Spurs",
        ],
        correctAnswer: "Golden State Warriors",
      },
      {
        question: "In Formula 1, what does DRS stand for?",
        options: [
          "Driver Reduction System",
          "Drag Reduction System",
          "Dynamic Racing Spoiler",
          "Downforce Regulation System",
        ],
        correctAnswer: "Drag Reduction System",
      },
      {
        question: "Which country has won the most Olympic gold medals overall?",
        options: ["United States", "Soviet Union", "China", "Great Britain"],
        correctAnswer: "United States",
      },
      {
        question:
          "In cycling, what is the name of the leader's yellow jersey race?",
        options: [
          "Giro d'Italia",
          "Vuelta a España",
          "Tour de France",
          "Paris–Roubaix",
        ],
        correctAnswer: "Tour de France",
      },
      {
        question:
          "Which cricket bowler holds the record for most Test wickets?",
        options: [
          "Muttiah Muralitharan",
          "Shane Warne",
          "James Anderson",
          "Anil Kumble",
        ],
        correctAnswer: "Muttiah Muralitharan",
      },
    ],
  },
};
