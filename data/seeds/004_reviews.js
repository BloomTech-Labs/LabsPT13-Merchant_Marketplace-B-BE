exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reviews')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {
          seller_id: 'pv2864sfheem5j4o2vhs',
          buyer_id: '00ulthapbErVUwVJy4x6',
          rate: 3,
          title: 'Great Display, Lots of Dead Pixels',
          description:
            "I bought 2 and they are great for gaming and work. I was worried about the curve but it hasn't been a problem for text and the colors are popping for playing Rocket League on a 980Ti.",
        },
        {
          seller_id: '00ulthapbErVUwVJy4x6',
          buyer_id: 'pv2864sfheem5j4o2vhs',
          rate: 2.5,
          title: 'Good build quality but poor picture quality',
          description:
            "Usually a huge fan of Dell monitors, and this has most of the things I like such as a great stand that's very adjustable and easy to assemble/disassemble while being really sturdy. But the picture quality on this monitor really isn't that great, and the options are a little frustrating for trying to calibrate it.",
        },
        {
          seller_id: '00ulthapbErVUwVJy4x6',
          buyer_id: 'jhbgvwyejp81ds9jzuo9',
          rate: 4.5,
          title: 'Amazing Graphics!!!',
          description:
            'Amazing Graphics paired with my Xbox Series X.  Running 1440@120fps or 4k@60fps is a game changer...It even makes playing older titles more enjoyable!  Highly recommend!!!',
        },
        {
          seller_id: '2j0epjkdhqo6wvkh0v7f',
          buyer_id: 'jhbgvwyejp81ds9jzuo9',
          rate: 5,
          title: 'Great picture and build quality',
          description:
            'This is an excellent monitor and especially at the Black Friday price. I was able to get G-Sync to work with my RTX 2070-Super no problem. Like others have stated you need to buy a v1.4 DisplayPort cable as the one that comes in the box is only a v1.2 which will cause flickering issues with G-sync turned on. Also, be sure to check the box and make sure you get the REV A03 or A04 model.',
        },
      ]);
    });
};
