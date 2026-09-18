const MALE_NAMES = new Set([
  "abdul", "abdullah", "abid", "abir", "adam", "adnan", "adrian", "afnan",
  "ahmad", "ahmed", "akbar", "akram", "albert", "ali", "alex", "alexander",
  "alfred", "alvi", "amin", "amir", "andrew", "andy", "anik", "anis",
  "anthony", "anton", "anwar", "arafat", "archie", "arif", "arman", "arnold",
  "arthur", "asif", "ashik", "ashraf", "atik", "atiq", "awal", "azad",
  "azhar", "aziz", "babar", "babul", "bakhtiar", "basil", "baylor", "ben",
  "benjamin", "berthold", "brian", "brad", "brandon", "brendan", "bruce",
  "bulbul", "burhan", "cameron", "charles", "chandan", "chandra", "chris",
  "christian", "christopher", "clark", "conrad", "cory", "craig", "dale",
  "dalim", "daniel", "danny", "david", "dean", "delwar", "dennis", "derek",
  "diba", "dilip", "dipu", "dominick", "don", "dong", "douglas", "doyle",
  "ebrahim", "edmond", "edmund", "edward", "elias", "elliot", "emad", "emiliano",
  "emon", "emran", "enayet", "eric", "erik", "ernesto", "eugene", "evan",
  "fahad", "fahim", "faisal", "farhan", "farid", "faruk", "fedor", "felipe",
  "felix", "fernando", "frank", "fred", "fredrick", "fuad", "gabriel", "gadiel",
  "genaro", "gerald", "gerard", "george", "gias", "gil", "gilbert", "golam",
  "gordon", "grace", "grant", "greg", "gregory", "guido", "gustavo", "habib",
  "hafiz", "hakim", "halim", "hamid", "hammad", "hao", "harrison", "harun",
  "harvey", "hasan", "hasib", "hassan", "hector", "helal", "henry", "hilbert",
  "hobert", "holmes", "howard", "hossain", "hubert", "hugh", "hugo", "humayun",
  "ian", "ibrahim", "ikhtiar", "ikram", "imran", "ion", "isaac", "isaiah",
  "islam", "israil", "issac", "ivan", "jaafar", "jack", "jacob", "jahan",
  "jahid", "jakob", "james", "jamie", "jamir", "jason", "jay", "jayden",
  "jerald", "jeremiah", "jerry", "jesse", "jhon", "jim", "jimmie", "joaquin",
  "joel", "john", "johnathan", "johnny", "jole", "jon", "jonathan", "jordan",
  "jose", "joshua", "judah", "julian", "julio", "justin", "kamal", "kamel",
  "karen", "karim", "karl", "kevin", "khan", "knute", "kurt", "kyeong",
  "lalit", "lance", "larry", "leland", "lennard", "leo", "leon", "leonard",
  "liam", "linwood", "lionel", "lisandro", "lito", "logan", "louis", "lucas",
  "luke", "lwin", "mahmud", "mahfuz", "mamun", "marcus", "mark", "marlin",
  "marshall", "martin", "marvin", "mason", "masud", "matias", "matthew", "maurice",
  "max", "maximo", "michael", "miguel", "mike", "milton", "mirza", "mohammad",
  "mohamed", "mohsin", "moises", "mong", "muhammad", "muntasz", "murad", "mustafa",
  "nabil", "nadim", "nahid", "nassir", "nathan", "nathaniel", "neil", "nels",
  "nicholas", "nick", "nicolas", "nicolaus", "niels", "nimish", "nur", "odell",
  "olaf", "ole", "oliver", "omar", "oswald", "owens", "paolo", "parker",
  "patrick", "paul", "pedro", "perl", "phillip", "pierre", "policarpio", "pradyot",
  "pranay", "quentin", "rafael", "rafiq", "rafi", "rahman", "rahmat", "raja",
  "rajib", "ram", "ramiro", "randall", "randy", "rashid", "raymond", "reinhard",
  "remy", "ricardo", "richard", "rick", "robert", "roberto", "robil", "robin",
  "rodney", "roland", "romain", "ronald", "rondald", "ronnie", "rosendo", "rowens",
  "roy", "rubel", "rudy", "russell", "ryan", "saif", "sabbir", "sami",
  "samuel", "sardar", "saudi", "sean", "serge", "seth", "shafiq", "shah",
  "shakib", "sharif", "sherif", "shihab", "shuvo", "sidney", "simon", "sivat",
  "sohag", "solomon", "soren", "stanley", "stanislaw", "stefan", "stephen", "steve",
  "steven", "sumon", "tammy", "tanvir", "taofik", "tariq", "tauseef", "ted",
  "teodoro", "terry", "thomas", "timothy", "todd", "tom", "tomas", "tong",
  "tony", "tord", "travis", "trevor", "troy", "tyler", "ulysses", "viktor",
  "vincent", "vishal", "vladimir", "walter", "wang", "wayne", "william", "willie",
  "wilson", "wolfgang", "xiaoming", "yuhiro", "zachary", "zakir", "zhang", "zheng",
]);

const FEMALE_NAMES = new Set([
  "aaliyah", "aaa", "abbigail", "abby", "abigail", "ada", "adriana", "adrienne",
  "agnes", "aika", "ailani", "aisha", "alexa", "alexandra", "alice", "alicia",
  "alison", "aliza", "alla", "allison", "alma", "alondra", "alyssa", "amanda",
  "amber", "amelia", "amie", "amina", "amparo", "amy", "ana", "anastasia",
  "andrea", "angel", "angela", "angelica", "angie", "anika", "ann", "anna",
  "anne", "annette", "annie", "anthia", "antonette", "april", "araceli", "ariana",
  "arminda", "ashlea", "ashley", "aubrey", "audrey", "aurelia", "avery", "ayesha",
  "barbara", "basilia", "beatriz", "belinda", "bernadette", "bernice", "bertha", "bianca",
  "bonnie", "bonna", "brandi", "breanna", "brenda", "bridget", "brianna", "brittany",
  "brook", "brooklyn", "camila", "candace", "cara", "caren", "carina", "carla",
  "carmen", "carol", "carolina", "caroline", "carolyn", "carrie", "casandra", "casey",
  "cassandra", "catherine", "cathy", "cecelia", "celia", "chad", "chantal", "charity",
  "charlene", "charlotte", "cheyenne", "chloe", "christa", "christina", "cindy", "claire",
  "clara", "claudia", "coleen", "colleen", "connie", "constance", "cora", "courtney",
  "cristina", "crystal", "cynthia", "daisy", "dale", "danielle", "daphne", "dawn",
  "deanna", "deborah", "debra", "delia", "denise", "desiree", "diana", "diane",
  "dionne", "dolores", "dominique", "donna", "dora", "doreen", "dorothy", "doris",
  "edna", "efrain", "eileen", "elaine", "eleanor", "elena", "elizabeth", "ella",
  "ellen", "elsa", "elvira", "emily", "emma", "erin", "erica", "erika",
  "esther", "ethel", "eva", "evelyn", "faith", "farhana", "faye", "felicia",
  "fernanda", "florence", "florinda", "frances", "francesca", "frankie", "freya", "gaby",
  "gail", "gayle", "gemma", "georgina", "gillian", "gina", "gladys", "gloria",
  "grace", "gracie", "gretchen", "griselda", "gudrun", "guinevere", "gwendolyn", "haley",
  "hannah", "harriet", "hazel", "heather", "heidi", "helen", "helena", "hillary",
  "holly", "hope", "idan", "ilene", "ina", "ingrid", "irene", "irina",
  "iris", "isabella", "isabelle", "jacqueline", "jamie", "jana", "jane", "janelle",
  "janet", "janice", "jasmine", "jaquayla", "jennifer", "jessica", "jill", "joan",
  "joanna", "joanne", "jodie", "jolene", "jordan", "joy", "joyce", "judith",
  "julia", "juliana", "julie", "kaity", "kaitlyn", "karen", "karina", "kate",
  "katharine", "katherine", "kathleen", "kathryn", "kathy", "katie", "katrina", "kayla",
  "kerri", "kimberly", "kirsten", "kirstin", "kris", "kristen", "kristi", "kristina",
  "kristine", "krystal", "lacy", "laila", "lana", "larissa", "laura", "lauren",
  "leah", "leigha", "lena", "lenore", "leslie", "leticia", "liana", "lidia",
  "linda", "lindsay", "lisa", "lizbeth", "lorena", "lori", "lorraine", "louise",
  "lucia", "lucy", "luz", "lydia", "lynn", "mabel", "madeline", "madison",
  "mae", "malinda", "margaret", "margin", "marguerite", "maria", "marian", "marianne",
  "marie", "marilyn", "martina", "mary", "maureen", "may", "megan", "melanie",
  "melinda", "melissa", "michaela", "michelle", "mildred", "mina", "mireille", "miriam",
  "misti", "mitzi", "molly", "monica", "monique", "morris", "mya", "nadia",
  "nadine", "nan", "nancy", "naomi", "natalie", "natasha", "neva", "nhi",
  "nicole", "nina", "nirali", "noreen", "norma", "noor", "nusrat", "odette",
  "olga", "olivia", "ophelia", "paige", "pamela", "paola", "patricia", "paula",
  "paulette", "peggy", "pem", "penny", "phyllis", "piper", "precious", "priscilla",
  "quiana", "rachel", "rae", "ramonita", "ramona", "rebecca", "regan", "renata",
  "renee", "rhonda", "ria", "rosa", "rosalie", "rose", "rosemary", "ruth",
  "sabrina", "sadia", "sallie", "samantha", "sandra", "sandy", "sara", "sarah",
  "sasha", "saundra", "sayaka", "scarlett", "selena", "serena", "shakila", "shamika",
  "shannon", "shari", "sharon", "shawna", "sheila", "shelby", "shelly", "sheri",
  "sherri", "shirley", "sharmin", "shorna", "shyanne", "sienna", "signe", "silvia",
  "simona", "sofia", "sonia", "soniya", "sonja", "sophia", "sophie", "stacey",
  "stacy", "stephanie", "stella", "sue", "suk", "sumaiya", "susan", "susana",
  "susanna", "suzy", "sylvia", "tahmina", "tamara", "tami", "tania", "tanjila",
  "tanya", "tara", "tasha", "tasnim", "taylor", "tazkia", "teresa", "terri",
  "thresa", "tiffany", "tina", "tonya", "tracy", "trina", "trisha", "trudie",
  "tyisha", "umar", "ursula", "valerie", "vanessa", "vera", "veronica", "victoria",
  "vincent", "virginia", "vivian", "wanda", "wendy", "whitney", "willa", "willow",
  "winona", "winston", "xiaoli", "yolanda", "yvonne", "zara", "zoe", "zainab",
  "jannatul", "jannat", "nowrin", "mou", "mitu", "rimi", "runa", "nipa",
  "sumi", "shila", "shammi", "naima", "rumi", "rupali", "shamim", "kamrun",
]);

function getFirstName(name = "") {
  return String(name)
    .trim()
    .split(/\s+/)[0]
    .toLowerCase();
}

export function guessGender(name = "") {
  const first = getFirstName(name);

  if (MALE_NAMES.has(first)) return "male";
  if (FEMALE_NAMES.has(first)) return "female";

  return null;
}

function hashCode(str = "") {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }

  return hash;
}

export function authorAvatar(name = "", override = null) {
  if (override) return override;

  const gender = guessGender(name);
  const index = hashCode(name.toLowerCase()) % 100;

  if (gender === "female") {
    return `https://randomuser.me/api/portraits/women/${index}.jpg`;
  }

  return `https://randomuser.me/api/portraits/men/${index}.jpg`;
}