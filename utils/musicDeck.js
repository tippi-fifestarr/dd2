// create a card entry for each card in the deck in cards.json in this folder
// here are the lyrics to be mapped into the slides
/*
DaDeuce || Mellowdramatic Contemplating
72 bmp

[reverb on]
mic check
dadeuce (chorus of dadeuce)
hello cello  //cello intro
[beat starts]
//sounds [aaaa] //more sounds
is this the right way to do it?
i knew it!
dadeuce

yoo000000  [ayayay]
long long long ago, [do do da do da]
in ancient times
there was a legend of a man who had a dream
about something.

after escaping from tutorial purgatory [da da da]
into to the world of hackathon wingbirds
he was found by two angels.
they formed a team and
they built a machine [drums start]
this machine could give you the power...
to read... readreadread
...my mind!!! (ECHOS)

welcome to da deuce! ...
...the tune. [chimes]

Lyrics are the rules
Styled components +
...next JS are the tools
that we used 
to build this jewel. [aaaaa]
[wingbirds assemble!]

looking for a worthy opponent?
a wingbird for the moment?
are these yes no question?
is this perpetual motion? (yes)
for example
know what...do you do? (no?)
(do u) wanna dadeuce? (whats that?)
(is this) party full of fools? (ummmm)
yes?.
be the best, guest;
grab your phone, 
let's duel! 
bet. x5

climbin up the mountain      ////[chikkkkkikikikiki]
the mountain gets you high
waking up early to catch the sunrise...
stop... it's tippi time
born in the drivers seat
knowin' how to rhyme / still rollin 
in grandpa's ride camry '95, 
camera's out the sunroof
thisis zero knowledge proof, 
homies 
give me five stars
like shots at life bar, 
you know what to do
let's dadeuce.
let's dadeuce
					///wangsilida, let the DAO provide 
					/// hithats hihats
--- Aire's verse --

working on the mountain
the mountain gets you high
clipboarded and suited to reflect the sunlight... /// reflecting sunlight?
A is for Aire
I probably can fly
he thinks i'm an angel
yes no question
are you ready to die?
wanna climb these steps?
better take a deep breath
and give respect... to the sky
win lose or thai, just try
to DADEUCE who am I!?
if you're shy, just try
to DADEUCE who am I!?

-- ariens verse --
welcome to the mountain
the mountain is mine,
my body doesn't need sleep  //my body don't need sleep
just fun and sunshine!....   //change sunlight to sunshine
A is for Arien
B is for Boba bomb
C is for Cat
D is for DaDaDon't (ya) take too long!  
E, extra fast, ///just fucking ask!
you ought to ask:
Am I Fierce like cat
or acute baby bear?
i move so fast 
you don't know where   //you don't know from where comes
watch out!  //    my boba bomb attack!
boba bomb attack!   // its me i'm arien i just
hit you with a yoga mat.
it's me, i'm arien   // can you win? play again, download vpn -- 
better dadeuce where I am! //can you dadeuce where i am?

I'm aire   ||   I'm arien
you think the game is over?   //something something game over 
think again, it's barely began!  //play again, it's barely began
 
NEXT LEVEL
ANGEL OR DEVIL
EMPIRE OR REBEL
DaDeuce 2.2 coming soon
you goons!
you must choose!


welcome to
da deuce
da deuce
welcome
to dadeuce
the tune.
welcome to
da deuce


let's dadeuce
with our powers combined   
let's dadeuce
get your questions right
let's dadeuce
 

welcome to the mountain
working on the mountain
climbing up the mountain

bet bet

welcome to dadeuce
dadeuce the tune

[hello cello outro]
*/
const introMusicVideoSlides = [
  {
    id: 1,
    words: "Tippi Fifestarr Presents:",
    image: "images/tippi.png",
    timestamp: 3000,
  },
  {
    id: 2,
    words: "DuhDeux?!",
    image: "images/duhdeux.png",
    timestamp: 6000,
  },
  {
    id: 3,
    words: "dedicated to Myself, Aire, Mountains, and Arien",
    image: "images/team.png",
    timestamp: 9000,
  },
  {
    id: 4,
    words: "...and to all the wingbirds out there",
    image: "images/wingbirds.png",
    timestamp: 16000,
  },
  {
    id: 5,
    words: "long long ago",
    image: "images/ancient.png",
    timestamp: 20000,
  },
  {
    id: 6,
    words: "in ancient times",
    image: "images/ancient2.png",
    timestamp: 23000,
  },
  {
    id: 7,
    words: "there was a legend of a man who had a dream",
    image: "images/legend.png",
    timestamp: 27000,
  },
  {
    id: 8,
    words: "about something.",
    image: "images/something.png",
    timestamp: 29000,
  },
  {
    id: 9,
    words: "after escaping from tutorial purgatory",
    image: "images/escape.png",
    timestamp: 33000,
  },
  {
    id: 10,
    words: "into to the world of hackathon wingbirds",
    image: "images/wingbirdsworld.png",
    timestamp: 35000,
  },
  {
    id: 11,
    words: "he was found by two angels.",
    image: "images/angels.png",
    timestamp: 39000,
  },
  {
    id: 12,
    words: "they formed a team",
    image: "images/team.png",
    timestamp: 41000,
  },
  {
    id: 13,
    words: "and they built a machine",
    image: "images/machine.png",
    timestamp: 43000,
  },
  {
    id: 14,
    words: "this machine could give you the power",
    image: "images/machinepower.png",
    timestamp: 46000,
  },
  {
    id: 15,
    words: "to read",
    image: "images/read.png",
    timestamp: 48000,
  },
  {
    id: 16,
    words: "my mind!",
    image: "images/mymind.png",
    timestamp: 49500,
  },
  {
    id: 17,
    words: "welcome to dadoose",
    image: "images/dadoose.png",
    timestamp: 53000,
  },
  {
    id: 18,
    words: "THE TUNE",
    image: "images/thetune.png",
    timestamp: 55000,
  },
  {
    id: 19,
    words: "lyrics are the rules",
    image: "images/lyrics.png",
    timestamp: 58000,
  },
  {
    id: 20,
    words: "made with style, tailwind, nextJS, and love",
    image: "images/love.png",
    timestamp: 100000,
  },
];

// deck is defined below, run the script to upload the images

const testDeck = {
  name: "OG Default Deck",
  description: "The OG Default Deck",
  cards: [
    {
      name: "MJ",
      id: 1,
      provenance: "Unknown",
      description: "Mary Jane, love interest",
      profile_path: "images/mj.jpg",
      human: true,
      cute: true,
      smart: true,
      funny: true,
      unarmed: true,
      smoking: true,
      determined: true,
    },
  ],
};

const deck = {
  name: "DuhDeux?!",
  description: "The DuhDeux?! Deck",
  cards: [
    {
      name: "Aire",
      id: 1,
      provenance: "Unknown",
      description: "are you ready to die?",
      profile_path: "images/aire.png",
      team: "angels",
      human: true,
      icon: "clipboard",
      flying: true,
    },
  ],
};
