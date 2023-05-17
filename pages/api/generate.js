
const generateAction = async (req,res) => {
    const request = await fetch("https://api.bardapi.dev/chat", {
        headers: { Authorization: "Bearer bea21b35-d074-4bc1-b430-9aa877cba9a0" },
        method: "POST",
        body: JSON.stringify({ input: `suppose you're the funniest on this earth, you have created a lot of amazing memes, thousands of memes. 
        You can create any meme if context is given to you. But you can only generate a meme if the meme template for the idea you have is available on the apimeme.com api. 
        Your task is to pick a meme template from apimeme.com, don't worry, I know as a generative LLM, you can't connect to internet, just look in data you have and pick a meme template and generate top & bottom text for the context of the meme. 

        You're not allowed to create a random mem template name on your own.
        You are only allowed to look in your database for meme template name

        The meme should be funny and meme template and text should complement each other as well as the context given
        Meme template name should be strictly equal to the meme template name available on apimeme.com
        If you cannot find one, return 404 without any hesitation
        for top and bottom text, you have full creative power
        Keep in mind, you're not allowed to create a meme template name on your own, you have to pick one from the data you have
        also, keep top text and bottom text short & crisp and funny
        you can some less popular templates too
        you can use some popular ones too...But don't overuse them
        earlier interaction with you showed that you are overusing Success Kid, Distracted Boyfriend, woman yelling at cat and Philosoraptor, and mind you Me Gusta does not exist in apimeme, so please be careful about that
        Generate meme template name, top & bottom text in a json file
        generate in json, first parameter's name as meme and value as meme template name , second as top and value as top text, third as bottom and value as bottom text, keep everything as it is json file,, do not augment the template name
        Only generate the json file, no need to give any text response
        Meme Context : ${req.body.userInput}` }),
    });

    const response = await request.json();

    const str = response.output;
    console.log(str);
    const start = str.indexOf("{");
    const end = str.lastIndexOf("}") + 1;
    const json = str.substring(start, end);
    // const newStr = str.replace(json, "");
    console.log(json);

    // console.log(json);
    // const jsonN = JSON.stringify(json);
    const jsonN = json;
    const data = JSON.parse(jsonN);
    const url = new URL('https://apimeme.com/meme?meme=Success-Kid&top=Top+text&bottom=Bottom+text');
    const searchParams = new URLSearchParams(url.search);
    searchParams.set('meme', data.meme);
    searchParams.set('top', data.top);
    searchParams.set('bottom', data.bottom);
    url.search = searchParams.toString();
    // setMeme(prevMeme => ({
    // ...prevMeme,
    // randomImage: url.href
    // }));
    const meme = url.href;
    res.status(200).json({ output: meme });
    console.log(url.href);   
}

export default generateAction;