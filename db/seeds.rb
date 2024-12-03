# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# Initial seeding of my database
require 'faker'

# Clear tables
KitRequest.destroy_all
KitItem.destroy_all
Kit.destroy_all






# Seeding Kits
kits = Kit.create([
  { name: 'Discovery Kit', description: 'The Discovery Kit emphasizes exploration and learning about differences from an early age. It contains books appropriate for Pre-K through 2nd grade, as well as lesson plans and activities to complement each book. As a bonus, it includes two books for eduators to learn more about neurodiversity in the classroom.', grade_level: 'PK-2' },
  { name: 'Empowerment Kit', description: 'The Empowerment Kit promotes self-awareness and respect for others. It contains books appropriate for 3rd through 5th grade, as well as lesson plans and activities to complement each book. As a bonus, it includes two books for eduators to learn more about neurodiversity in the classroom.', grade_level: '3-5' },
  { name: 'Perspectives Kit', description: 'The Perspectives Kit aims to broaden understanding of different viewpoints and experiences. It contains books appropriate for 6th through 8th grade, as well as lesson plans and activities to complement each book. As a bonus, it includes two books for eduators to learn more about neurodiversity in the classroom.', grade_level: '6-8' },
  { name: 'Impact Kit', description: 'The Impact Kit aims to inspire meaningful action and change. It contains books appropriate for 9th through 12th grade, as well as lesson plans and activities to complement each book. As a bonus, it includes two books for eduators to learn more about neurodiversity in the classroom.', grade_level: '9-12' }
])

# Seeding KitItems
kit_items = KitItem.create([
  { name: 'A Friend for Henry -- Jenn Bailey', description: 'This story follows Henry, a young boy with autism, as he navigates the complexities of making friends in his classroom. It teaches children about understanding, patience, and the value of friendship.' },
  { name: 'My Brother Charlie -- Ryan Elizabeth Peete, Holly Robinson Peete', description: 'A heartwarming story about a young girl and her twin brother, Charlie, who has autism, highlighting their sibling bond and raising awareness about autism through a relatable lens.' },
  { name: 'Benji, the Bad Day, and Me -- Sally J. Pla', description: 'When Benji\'s older brother Sam has a bad day, Benji learns to empathize and support him, teaching children the importance of understanding the emotions of others, especially in families with neurodiverse siblings.' },
  { name: 'A Day With No Words -- Tiffany Hammond', description: 'This book offers a glimpse into a day of a mother and her non-verbal autistic son, showcasing how they communicate without spoken words and emphasizing the power of empathy and understanding.' },
  { name: 'Wiggles, Stomps, and Squeezes Calm My Jitters Down -- Lindsey Rowe Parker', description: 'Through the perspective of a child with sensory processing differences, this story explores how movement and sensory tools help manage big emotions, offering insights into emotional regulation and autism.' },
  { name: 'A Boy Called Bat -- Elana K. Arnold', description: 'Bat, a young boy with autism, forms a strong bond with an orphaned baby skunk, navigating life at home and school while learning valuable lessons about responsibility, family, and animal care.' },
  { name: 'The Girl Who Thought in Pictures: The Story of Dr. Temple Grandin -- Julia Finley Mosca', description: 'A biographical story of Dr. Temple Grandin, a trailblazer with autism who revolutionized animal science, teaching young readers about perseverance and thinking differently.' },
  { name: 'Mockingbird -- Kathryn Erskine', description: 'This story follows Caitlin, a young girl on the autism spectrum, as she copes with the loss of her brother and searches for closure and understanding in a world that feels confusing and overwhelming.' },
  { name: 'Can You See Me? -- Libby Scott, Rebecca Westcott', description: 'Tally, a girl with autism, struggles to fit in at school while trying to stay true to herself, highlighting themes of friendship, acceptance, and navigating school life.' },
  { name: 'Get a Grip, Vivy Cohen! -- Sarah Kapit', description: 'Vivy, a young girl with autism, is determined to play baseball despite challenges from her family and coaches. Her perseverance and passion for the sport offer inspiration and empowerment.' },
  { name: 'The Someday Birds -- Sally J. Pla', description: 'Charlie, a boy with autism, embarks on a cross-country road trip with his family to find his father, discovering adventure, family bonds, and self-discovery along the way.' },
  { name: 'A Kind of Spark -- Elle McNicoll', description: 'Addie, a young autistic girl, advocates for a memorial for the women accused of witchcraft in her village, drawing parallels to her own experiences with neurodiversity and teaching resilience.' },
  { name: 'The Goldfish Boy -- Lisa Thompson', description: 'A mystery story centered around Matthew, a boy with OCD, who becomes involved in the search for a missing child, while navigating his own mental health struggles.' },
  { name: 'Counting by 7s -- Holly Goldberg Sloan', description: 'After the tragic loss of her parents, 12-year-old Willow, a gifted girl who thinks differently, embarks on a journey of healing and finding a new family in unexpected places.' },
  { name: 'Not If I Can Help It -- Carolyn Mackler', description: 'Willa, a girl with sensory processing disorder, navigates changes in her family life while learning how to manage her sensitivities, highlighting themes of friendship and family dynamics.' },
  { name: 'Frankie\'s World -- Aoife Dooley', description: 'Frankie, a young girl with autism, embarks on a journey of self-discovery to understand herself better while navigating family, friendships, and adolescence.' },
  { name: 'Planet Earth Is Blue -- Nicole Panteleakos', description: 'Nova, a non-verbal autistic girl, dreams of space exploration and awaits the launch of the Space Shuttle Challenger while coping with family separation and loss.' },
  { name: 'Same But Different: Teen Life on the Autism Express -- Ryan Elizabeth Peete, Holly Robinson Peete', description: 'A look into the life of twins Charlie and Callie as they navigate the ups and downs of teenage life with one sibling being on the autism spectrum, exploring themes of family and growing up.' },
  { name: 'The Awesome Autistic Go-To Guide: A Practical Handbook for Autistic Teens and Tweens -- Tanya Masterman, Yenn Purkis', description: 'A practical guide offering autistic teens advice on various aspects of life, from friendships and school to understanding themselves and celebrating neurodiversity.' },
  { name: 'The Curious Incident of the Dog in the Night-Time -- Mark Haddon', description: 'Christopher, a boy with autism, investigates the death of a neighbor\'s dog, leading him on a journey of self-discovery and independence as he unravels family secrets.' },
  { name: 'The Rosie Project -- Graeme Simsion', description: 'Don Tillman, a socially awkward genetics professor with traits of autism, embarks on a journey to find love, resulting in humorous and heartwarming moments of self-realization and growth.' },
  { name: 'A Different Sort of Normal -- Abigail Balfe', description: 'A personal memoir of the author\'s experiences growing up as an autistic woman, offering insights into self-acceptance, societal expectations, and navigating life on the spectrum.' },
  { name: 'NeuroTribes: The Legacy of Autism and the Future of Neurodiversity -- Steve Silberman', description: 'This comprehensive history of autism traces its origins, explores scientific understanding, and advocates for a more inclusive view of neurodiversity in modern society.' },
  { name: 'Neurodiversity in the Classroom: Strength-Based Strategies to Help Students with Special Needs Succeed in School and Life -- Thomas Armstrong', description: 'An excellent resource for teachers that focuses on practical, strength-based strategies to support neurodivergent students, such as those with autism, ADHD, dyslexia, and other learning differences.' }

])

# Associate KitItems with Kits using the join table
discovery_kit = Kit.find_by(name: 'Discovery Kit')
empowerment_kit = Kit.find_by(name: 'Empowerment Kit')
perspectives_kit = Kit.find_by(name: 'Perspectives Kit')
impact_kit = Kit.find_by(name: 'Impact Kit')

# Attach images to Kits (using local files or remote URLs)
discovery_kit.image.attach(
  io: File.open('db/seed_img/blue-box.jpg'),
  filename: 'blue-box.jpg',
  content_type: 'image/jpeg',
  identify: false
)

empowerment_kit.image.attach(
  io: File.open('db/seed_img/green-box.jpg'),
  filename: 'green-box.jpg',
  content_type: 'image/jpeg',
  identify: false
)

perspectives_kit.image.attach(
  io: File.open('db/seed_img/purple-box.jpg'),
  filename: 'purple-box.jpg',
  content_type: 'image/jpeg',
  identify: false
)

impact_kit.image.attach(
  io: File.open('db/seed_img/gray-box.jpg'),
  filename: 'gray-box.jpg',
  content_type: 'image/jpeg',
  identify: false
)

henry_book = KitItem.find_by(name: 'A Friend for Henry -- Jenn Bailey')

henry_book.image.attach(
  io: File.open('db/seed_img/henry_book.png'),
  filename: 'henry_book.png',
  content_type: 'image/png',
  identify: false
)
charlie_book = KitItem.find_by(name: 'My Brother Charlie -- Ryan Elizabeth Peete, Holly Robinson Peete')

charlie_book.image.attach(
  io: File.open('db/seed_img/charlie_book.png'),
  filename: 'charlie_book.png',
  content_type: 'image/png',
  identify: false
)
benji_book = KitItem.find_by(name: 'Benji, the Bad Day, and Me -- Sally J. Pla')

benji_book.image.attach(
  io: File.open('db/seed_img/benji_book.png'),
  filename: 'benji_book.png',
  content_type: 'image/png',
  identify: false
)
no_words_book = KitItem.find_by(name: 'A Day With No Words -- Tiffany Hammond')

no_words_book.image.attach(
  io: File.open('db/seed_img/no_words_book.png'),
  filename: 'no_words_book.png',
  content_type: 'image/png',
  identify: false
)
wiggles_book = KitItem.find_by(name: 'Wiggles, Stomps, and Squeezes Calm My Jitters Down -- Lindsey Rowe Parker')

wiggles_book.image.attach(
  io: File.open('db/seed_img/wiggles_book.png'),
  filename: 'wiggles_book.png',
  content_type: 'image/png',
  identify: false
)
boy_bat_book = KitItem.find_by(name: 'A Boy Called Bat -- Elana K. Arnold')

boy_bat_book.image.attach(
  io: File.open('db/seed_img/boy_bat_book.png'),
  filename: 'boy_bat_book.png',
  content_type: 'image/png',
  identify: false
)
temple_book = KitItem.find_by(name: 'The Girl Who Thought in Pictures: The Story of Dr. Temple Grandin -- Julia Finley Mosca')

temple_book.image.attach(
  io: File.open('db/seed_img/temple_book.png'),
  filename: 'temple_book.png',
  content_type: 'image/png',
  identify: false
)
mockingbird_book = KitItem.find_by(name: 'Mockingbird -- Kathryn Erskine')

mockingbird_book.image.attach(
  io: File.open('db/seed_img/mockingbird_book.png'),
  filename: 'mockingbird_book.png',
  content_type: 'image/png',
  identify: false
)
see_me_book = KitItem.find_by(name: 'Can You See Me? -- Libby Scott, Rebecca Westcott')

see_me_book.image.attach(
  io: File.open('db/seed_img/see_me_book.png'),
  filename: 'see_me_book.png',
  content_type: 'image/png',
  identify: false
)
vivy_book = KitItem.find_by(name: 'Get a Grip, Vivy Cohen! -- Sarah Kapit')

vivy_book.image.attach(
  io: File.open('db/seed_img/vivy_book.png'),
  filename: 'vivy_book.png',
  content_type: 'image/png',
  identify: false
)
someday_book = KitItem.find_by(name: 'The Someday Birds -- Sally J. Pla')

someday_book.image.attach(
  io: File.open('db/seed_img/someday_book.png'),
  filename: 'someday_book.png',
  content_type: 'image/png',
  identify: false
)
spark_book = KitItem.find_by(name: 'A Kind of Spark -- Elle McNicoll')

spark_book.image.attach(
  io: File.open('db/seed_img/spark_book.png'),
  filename: 'spark_book.png',
  content_type: 'image/png',
  identify: false
)
goldfish_boy_book = KitItem.find_by(name: 'The Goldfish Boy -- Lisa Thompson')

goldfish_boy_book.image.attach(
  io: File.open('db/seed_img/goldfish_boy_book.png'),
  filename: 'goldfish_boy_book.png',
  content_type: 'image/png',
  identify: false
)
sevens_book = KitItem.find_by(name: 'Counting by 7s -- Holly Goldberg Sloan')

sevens_book.image.attach(
  io: File.open('db/seed_img/sevens_book.png'),
  filename: 'sevens_book.png',
  content_type: 'image/png',
  identify: false
)
not_if_book = KitItem.find_by(name: 'Not If I Can Help It -- Carolyn Mackler')

not_if_book.image.attach(
  io: File.open('db/seed_img/not_if_book.png'),
  filename: 'not_if_book.png',
  content_type: 'image/png',
  identify: false
)
frankie_book = KitItem.find_by(name: 'Frankie\'s World -- Aoife Dooley')

frankie_book.image.attach(
  io: File.open('db/seed_img/frankie_book.png'),
  filename: 'frankie_book.png',
  content_type: 'image/png',
  identify: false
)
earth_blue_book = KitItem.find_by(name: 'Planet Earth Is Blue -- Nicole Panteleakos')

earth_blue_book.image.attach(
  io: File.open('db/seed_img/earth_blue_book.png'),
  filename: 'earth_blue_book.png',
  content_type: 'image/png',
  identify: false
)
same_book = KitItem.find_by(name: 'Same But Different: Teen Life on the Autism Express -- Ryan Elizabeth Peete, Holly Robinson Peete')

same_book.image.attach(
  io: File.open('db/seed_img/same_book.png'),
  filename: 'same_book.png',
  content_type: 'image/png',
  identify: false
)
awesome_guide_book = KitItem.find_by(name: 'The Awesome Autistic Go-To Guide: A Practical Handbook for Autistic Teens and Tweens -- Tanya Masterman, Yenn Purkis')

awesome_guide_book.image.attach(
  io: File.open('db/seed_img/awesome_guide_book.png'),
  filename: 'awesome_guide_book.png',
  content_type: 'image/png',
  identify: false
)
curious_dog_book = KitItem.find_by(name: 'The Curious Incident of the Dog in the Night-Time -- Mark Haddon')

curious_dog_book.image.attach(
  io: File.open('db/seed_img/curious_dog_book.png'),
  filename: 'curious_dog_book.png',
  content_type: 'image/png',
  identify: false
)
rosie_book = KitItem.find_by(name: 'The Rosie Project -- Graeme Simsion')

rosie_book.image.attach(
  io: File.open('db/seed_img/rosie_book.png'),
  filename: 'rosie_book.png',
  content_type: 'image/png',
  identify: false
)
different_book = KitItem.find_by(name: 'A Different Sort of Normal -- Abigail Balfe')

different_book.image.attach(
  io: File.open('db/seed_img/different_book.png'),
  filename: 'different_book.png',
  content_type: 'image/png',
  identify: false
)
neurotribes_book = KitItem.find_by(name: 'NeuroTribes: The Legacy of Autism and the Future of Neurodiversity -- Steve Silberman')

neurotribes_book.image.attach(
  io: File.open('db/seed_img/neurotribes_book.png'),
  filename: 'neurotribes_book.png',
  content_type: 'image/png',
  identify: false
)
classroom_book = KitItem.find_by(name: 'Neurodiversity in the Classroom: Strength-Based Strategies to Help Students with Special Needs Succeed in School and Life -- Thomas Armstrong')

classroom_book.image.attach(
  io: File.open('db/seed_img/classroom_book.png'),
  filename: 'classroom_book.png',
  content_type: 'image/png',
  identify: false
)


# Now associating KitItems with Kits
discovery_kit.kit_items << henry_book << charlie_book << benji_book << no_words_book << wiggles_book << classroom_book << neurotribes_book
empowerment_kit.kit_items << boy_bat_book << temple_book << see_me_book << vivy_book << someday_book << not_if_book << spark_book << classroom_book << neurotribes_book
perspectives_kit.kit_items << goldfish_boy_book << sevens_book << frankie_book << earth_blue_book << same_book << awesome_guide_book << mockingbird_book << classroom_book << neurotribes_book
impact_kit.kit_items << curious_dog_book << rosie_book << different_book << classroom_book << neurotribes_book

# Seeding KitRequests

KitRequest.create([
  { school_year: '2024-2025', kit: discovery_kit },
  { school_year: '2024-2025', kit: empowerment_kit }
])

# Seeding first_name and last_name instead of name

50.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name
  )
end

