import type { Sentence } from '../types'

export const SENTENCES: Sentence[] = [
  // TIER 1 - Basic sentences for beginners
  // Greetings & Daily
  { hebrew: 'שלום מה שלומך היום', english: 'Hello how are you today', tier: 1 },
  { hebrew: 'בוקר טוב לך ידידי', english: 'Good morning to you my friend', tier: 1 },
  { hebrew: 'ערב טוב מה נשמע', english: 'Good evening how is it going', tier: 1 },
  { hebrew: 'תודה רבה על הכל', english: 'Thank you very much for everything', tier: 1 },
  { hebrew: 'סליחה אני לא מבין', english: 'Sorry I do not understand', tier: 1 },
  { hebrew: 'בבקשה תעזור לי קצת', english: 'Please help me a little', tier: 1 },
  { hebrew: 'להתראות נתראה מחר בבוקר', english: 'Goodbye see you tomorrow morning', tier: 1 },
  
  // Family
  { hebrew: 'אמא ואבא גרים בבית', english: 'Mom and dad live at home', tier: 1 },
  { hebrew: 'יש לי אח ואחות', english: 'I have a brother and sister', tier: 1 },
  { hebrew: 'הילד והילדה משחקים בגן', english: 'The boy and girl play in the garden', tier: 1 },
  { hebrew: 'אמא מבשלת ארוחת ערב טעימה', english: 'Mom cooks a tasty dinner', tier: 1 },
  { hebrew: 'אבא קורא ספר לילדים', english: 'Dad reads a book to the children', tier: 1 },
  { hebrew: 'אני אוהב את המשפחה שלי', english: 'I love my family', tier: 1 },
  { hebrew: 'סבא וסבתא באים לבקר', english: 'Grandpa and grandma come to visit', tier: 1 },
  
  // Animals
  { hebrew: 'הכלב רץ מהר בגן', english: 'The dog runs fast in the garden', tier: 1 },
  { hebrew: 'החתול ישן על הספה', english: 'The cat sleeps on the sofa', tier: 1 },
  { hebrew: 'הציפור שרה בחלון שלי', english: 'The bird sings at my window', tier: 1 },
  { hebrew: 'הדג שוחה במים הקרים', english: 'The fish swims in the cold water', tier: 1 },
  { hebrew: 'יש לנו כלב חום גדול', english: 'We have a big brown dog', tier: 1 },
  { hebrew: 'החתול שלי אוהב לשחק', english: 'My cat loves to play', tier: 1 },
  { hebrew: 'ראיתי ציפור יפה בחוץ', english: 'I saw a beautiful bird outside', tier: 1 },
  
  // Food & Drink
  { hebrew: 'אני אוכל תפוח אדום טעים', english: 'I eat a tasty red apple', tier: 1 },
  { hebrew: 'הלחם הזה מאוד טעים', english: 'This bread is very tasty', tier: 1 },
  { hebrew: 'אני שותה מים קרים עכשיו', english: 'I drink cold water now', tier: 1 },
  { hebrew: 'אמא עשתה עוגה לארוחת ערב', english: 'Mom made a cake for dinner', tier: 1 },
  { hebrew: 'אני רוצה לאכול בננה', english: 'I want to eat a banana', tier: 1 },
  { hebrew: 'יש חלב טרי במקרר', english: 'There is fresh milk in the fridge', tier: 1 },
  { hebrew: 'הביצה הזאת טעימה מאוד', english: 'This egg is very tasty', tier: 1 },
  
  // Home
  { hebrew: 'הבית שלי גדול ויפה', english: 'My house is big and beautiful', tier: 1 },
  { hebrew: 'יש לנו חדר שינה קטן', english: 'We have a small bedroom', tier: 1 },
  { hebrew: 'השולחן עומד באמצע החדר', english: 'The table stands in the middle of the room', tier: 1 },
  { hebrew: 'אני יושב על הכיסא', english: 'I sit on the chair', tier: 1 },
  { hebrew: 'הדלת פתוחה והחלון סגור', english: 'The door is open and the window is closed', tier: 1 },
  { hebrew: 'יש תמונה יפה על הקיר', english: 'There is a beautiful picture on the wall', tier: 1 },
  { hebrew: 'המיטה שלי נוחה מאוד', english: 'My bed is very comfortable', tier: 1 },
  
  // Colors & Nature
  { hebrew: 'השמים כחולים והשמש זורחת', english: 'The sky is blue and the sun shines', tier: 1 },
  { hebrew: 'הירח יפה בלילה הזה', english: 'The moon is beautiful tonight', tier: 1 },
  { hebrew: 'יש פרחים אדומים בגינה', english: 'There are red flowers in the garden', tier: 1 },
  { hebrew: 'העץ הירוק גדול מאוד', english: 'The green tree is very big', tier: 1 },
  { hebrew: 'השלג לבן ויפה בחורף', english: 'The snow is white and beautiful in winter', tier: 1 },
  { hebrew: 'הים כחול והחול חם', english: 'The sea is blue and the sand is warm', tier: 1 },
  { hebrew: 'ראיתי קשת צבעונית בשמים', english: 'I saw a colorful rainbow in the sky', tier: 1 },
  
  // Time & Days
  { hebrew: 'היום יום שני בבוקר', english: 'Today is Monday morning', tier: 1 },
  { hebrew: 'מחר אני הולך לבית ספר', english: 'Tomorrow I go to school', tier: 1 },
  { hebrew: 'אתמול היה יום טוב מאוד', english: 'Yesterday was a very good day', tier: 1 },
  { hebrew: 'עכשיו השעה שמונה בערב', english: 'Now it is eight in the evening', tier: 1 },
  { hebrew: 'בלילה אני הולך לישון', english: 'At night I go to sleep', tier: 1 },
  { hebrew: 'בשבת אנחנו נחים בבית', english: 'On Saturday we rest at home', tier: 1 },
  { hebrew: 'ביום ראשון אני קם מוקדם', english: 'On Sunday I wake up early', tier: 1 },
  
  // School & Learning
  { hebrew: 'אני לומד עברית בבית ספר', english: 'I learn Hebrew at school', tier: 1 },
  { hebrew: 'המורה כותבת על הלוח', english: 'The teacher writes on the board', tier: 1 },
  { hebrew: 'יש לי ספר חדש לקרוא', english: 'I have a new book to read', tier: 1 },
  { hebrew: 'אני כותב במחברת שלי', english: 'I write in my notebook', tier: 1 },
  { hebrew: 'השיעור היה מעניין היום', english: 'The lesson was interesting today', tier: 1 },
  { hebrew: 'אני אוהב ללמוד דברים חדשים', english: 'I love to learn new things', tier: 1 },
  { hebrew: 'יש מבחן מחר בבוקר', english: 'There is a test tomorrow morning', tier: 1 },

  // TIER 2 - Intermediate sentences
  // Actions & Activities
  { hebrew: 'אני הולך לחנות לקנות אוכל', english: 'I go to the store to buy food', tier: 2 },
  { hebrew: 'היא רצה מהר מאוד בפארק', english: 'She runs very fast in the park', tier: 2 },
  { hebrew: 'הוא עושה שיעורי בית עכשיו', english: 'He does homework now', tier: 2 },
  { hebrew: 'אנחנו אוכלים ארוחת צהריים יחד', english: 'We eat lunch together', tier: 2 },
  { hebrew: 'הם משחקים כדורגל בחצר', english: 'They play soccer in the yard', tier: 2 },
  { hebrew: 'אני שומע מוזיקה יפה מאוד', english: 'I hear very beautiful music', tier: 2 },
  { hebrew: 'היא רואה סרט עם חברים', english: 'She watches a movie with friends', tier: 2 },
  { hebrew: 'הוא חושב על הבעיה הזאת', english: 'He thinks about this problem', tier: 2 },
  { hebrew: 'אנחנו יודעים את התשובה הנכונה', english: 'We know the correct answer', tier: 2 },
  { hebrew: 'הם רוצים לנסוע לים', english: 'They want to travel to the sea', tier: 2 },
  
  // Questions & Conversations
  { hebrew: 'מה אתה עושה היום בערב', english: 'What are you doing this evening', tier: 2 },
  { hebrew: 'איפה נמצא בית הספר שלך', english: 'Where is your school located', tier: 2 },
  { hebrew: 'מתי אתה בא לבקר אותנו', english: 'When are you coming to visit us', tier: 2 },
  { hebrew: 'למה הוא לא בא היום', english: 'Why did he not come today', tier: 2 },
  { hebrew: 'איך אני מגיע לתחנה הקרובה', english: 'How do I get to the nearest station', tier: 2 },
  { hebrew: 'מי זה האיש הזה שם', english: 'Who is that man over there', tier: 2 },
  { hebrew: 'כמה זה עולה בבקשה', english: 'How much does this cost please', tier: 2 },
  { hebrew: 'האם אתה יכול לעזור לי', english: 'Can you help me', tier: 2 },
  { hebrew: 'מה השעה עכשיו בבקשה', english: 'What time is it now please', tier: 2 },
  { hebrew: 'איזה יום היום בשבוע', english: 'What day is it today', tier: 2 },
  
  // City & Travel
  { hebrew: 'אני גר בעיר גדולה ויפה', english: 'I live in a big beautiful city', tier: 2 },
  { hebrew: 'הרחוב הזה ארוך מאוד', english: 'This street is very long', tier: 2 },
  { hebrew: 'המכונית שלי עומדת בחניה', english: 'My car is parked in the parking lot', tier: 2 },
  { hebrew: 'אני נוסע באוטובוס לעבודה', english: 'I travel by bus to work', tier: 2 },
  { hebrew: 'יש הרבה אנשים ברחוב היום', english: 'There are many people on the street today', tier: 2 },
  { hebrew: 'התחנה נמצאת ליד הבניין הגדול', english: 'The station is near the big building', tier: 2 },
  { hebrew: 'אני צריך לקנות כרטיס נסיעה', english: 'I need to buy a travel ticket', tier: 2 },
  { hebrew: 'הטיסה ממריאה בשעה עשר', english: 'The flight takes off at ten', tier: 2 },
  { hebrew: 'המלון נמצא במרכז העיר', english: 'The hotel is in the city center', tier: 2 },
  { hebrew: 'אנחנו מטיילים בארץ ישראל', english: 'We are traveling in Israel', tier: 2 },
  
  // Work & Money
  { hebrew: 'אני עובד במשרד כל יום', english: 'I work in an office every day', tier: 2 },
  { hebrew: 'העבודה שלי מעניינת מאוד', english: 'My work is very interesting', tier: 2 },
  { hebrew: 'יש לי פגישה חשובה היום', english: 'I have an important meeting today', tier: 2 },
  { hebrew: 'הוא מרוויח כסף טוב בעבודה', english: 'He earns good money at work', tier: 2 },
  { hebrew: 'אני צריך לשלם את החשבון', english: 'I need to pay the bill', tier: 2 },
  { hebrew: 'הבנק סגור ביום שבת', english: 'The bank is closed on Saturday', tier: 2 },
  { hebrew: 'יש לי מספיק כסף לקנות', english: 'I have enough money to buy', tier: 2 },
  { hebrew: 'המחיר הזה יקר מדי', english: 'This price is too expensive', tier: 2 },
  { hebrew: 'אני מחפש עבודה חדשה עכשיו', english: 'I am looking for a new job now', tier: 2 },
  { hebrew: 'הוא הבוס שלי בעבודה', english: 'He is my boss at work', tier: 2 },
  
  // Weather & Seasons
  { hebrew: 'היום חם מאוד בחוץ', english: 'Today it is very hot outside', tier: 2 },
  { hebrew: 'בחורף קר ויורד גשם', english: 'In winter it is cold and rainy', tier: 2 },
  { hebrew: 'הקיץ הזה חם במיוחד', english: 'This summer is especially hot', tier: 2 },
  { hebrew: 'יורד שלג בהרים הגבוהים', english: 'Snow falls in the high mountains', tier: 2 },
  { hebrew: 'הרוח חזקה היום בחוף', english: 'The wind is strong today at the beach', tier: 2 },
  { hebrew: 'יש עננים רבים בשמים', english: 'There are many clouds in the sky', tier: 2 },
  { hebrew: 'האביב הוא עונה יפה', english: 'Spring is a beautiful season', tier: 2 },
  { hebrew: 'בסתיו העלים נושרים מהעצים', english: 'In autumn leaves fall from trees', tier: 2 },
  { hebrew: 'מחר יהיה מזג אוויר נעים', english: 'Tomorrow the weather will be pleasant', tier: 2 },
  { hebrew: 'אני אוהב את הגשם בחורף', english: 'I love the rain in winter', tier: 2 },
  
  // Feelings & Opinions
  { hebrew: 'אני מרגיש טוב היום מאוד', english: 'I feel very good today', tier: 2 },
  { hebrew: 'היא שמחה לראות את החברים', english: 'She is happy to see the friends', tier: 2 },
  { hebrew: 'הוא עייף אחרי יום ארוך', english: 'He is tired after a long day', tier: 2 },
  { hebrew: 'אנחנו מתרגשים מהחדשות הטובות', english: 'We are excited about the good news', tier: 2 },
  { hebrew: 'אני חושב שזה רעיון טוב', english: 'I think this is a good idea', tier: 2 },
  { hebrew: 'היא מאמינה בך מאוד', english: 'She believes in you very much', tier: 2 },
  { hebrew: 'הוא מקווה להצליח במבחן', english: 'He hopes to succeed in the test', tier: 2 },
  { hebrew: 'אני מודאג מהמצב הזה', english: 'I am worried about this situation', tier: 2 },
  { hebrew: 'היא גאה בהישגים שלה', english: 'She is proud of her achievements', tier: 2 },
  { hebrew: 'אנחנו אסירי תודה על העזרה', english: 'We are grateful for the help', tier: 2 },
  
  // Numbers & Shopping
  { hebrew: 'אני רוצה לקנות שלושה תפוחים', english: 'I want to buy three apples', tier: 2 },
  { hebrew: 'יש לי חמישה שקלים בכיס', english: 'I have five shekels in my pocket', tier: 2 },
  { hebrew: 'הם קנו עשר ביצים בחנות', english: 'They bought ten eggs at the store', tier: 2 },
  { hebrew: 'המחיר הוא עשרים שקלים', english: 'The price is twenty shekels', tier: 2 },
  { hebrew: 'אנחנו צריכים מאה גרם גבינה', english: 'We need one hundred grams of cheese', tier: 2 },
  { hebrew: 'יש ארבעה אנשים בתור', english: 'There are four people in line', tier: 2 },
  { hebrew: 'הקופה נמצאת בסוף החנות', english: 'The register is at the end of the store', tier: 2 },
  { hebrew: 'אני משלם במזומן או בכרטיס', english: 'I pay in cash or by card', tier: 2 },
  { hebrew: 'יש הנחה של עשרים אחוז', english: 'There is a twenty percent discount', tier: 2 },
  { hebrew: 'הסל מלא במוצרים טובים', english: 'The basket is full of good products', tier: 2 },
  
  // Health & Body
  { hebrew: 'אני מרגיש לא טוב היום', english: 'I do not feel well today', tier: 2 },
  { hebrew: 'כואב לי הראש מאוד', english: 'My head hurts a lot', tier: 2 },
  { hebrew: 'אני צריך לראות רופא', english: 'I need to see a doctor', tier: 2 },
  { hebrew: 'היא לוקחת תרופה כל יום', english: 'She takes medicine every day', tier: 2 },
  { hebrew: 'הוא עושה ספורט בבוקר', english: 'He does sports in the morning', tier: 2 },
  { hebrew: 'חשוב לאכול אוכל בריא', english: 'It is important to eat healthy food', tier: 2 },
  { hebrew: 'אני שותה הרבה מים ביום', english: 'I drink a lot of water daily', tier: 2 },
  { hebrew: 'היא הולכת לישון מוקדם', english: 'She goes to sleep early', tier: 2 },
  { hebrew: 'הוא רץ חמישה קילומטר בבוקר', english: 'He runs five kilometers in the morning', tier: 2 },
  { hebrew: 'אנחנו צריכים לנוח יותר', english: 'We need to rest more', tier: 2 },
]

export const getTierCounts = () => ({
  tier1: SENTENCES.filter(s => s.tier === 1).length,
  tier2: SENTENCES.filter(s => s.tier === 2).length,
  total: SENTENCES.length,
})
