const correctTokenValue = 'secret123';

export default function handler(req, res) {
  const token = req.headers['x-auth'];
  if (!token || token !== correctTokenValue) {
    res.status(401).json({ error: "Authentication Error" });
  }

  res.status(200).json([
    {
      title: "Guide to securing API Keys - Don't forget the source",
      author: "Ray Coulstock",
      description: `
        <p>Reaed about how to keep your <i>secret API</i> keys out of source control,
        especially when working with open source software.</p>
      `,
    },
    {
      title: "Man's Best Friend - The Antelope",
      author: "John Doe",
      description: `
        <p>Hear about my journey with my antelope friend, Harry, and why I've discovered 
        that antelopes are <i>the</i> best companions for humans.</p>
      `,
    },
    {
      title: "An Antelope's Habitat",
      author: "Jane Doe",
      description: `
        <p>As a higher order of life, an antelope has very particular needs for a healthy
        and nurturing enviroment.</p>
        <p>Learn these top tips for how to prepare your own space for the inevitable visit
        from our horned friends.</p>
      `,
    },
    {
      title: "Coping with the Coming Antelope Revolution",
      author: "Foo Bar",
      description: `
        <p>Many of us have questions about the new era. Will I be fairly treated by these gentle
        grassland overlords? Will I still be relevant? Learn why antelopes are not to be feared.</p>
      `,
    },
  ]);
}
