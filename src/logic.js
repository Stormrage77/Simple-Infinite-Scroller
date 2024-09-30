const loader = document.getElementById("loader");
const MainContainer = document.getElementById("MainContainer");
let count = 0;

const API_URL = `https://picsum.photos/v2/list?page=${Math.floor(Math.random() * 10)}&limit=10`;
let picsArray = [];


function SetLoader(action)
{
    if (!loader)
    {
        throw new error("Can't find loader element!");
    }
    
    switch (action)
    {
        case "loading":
            loader.hidden = false;
            MainContainer.hidden = true;
            break;
        
        case "completed":
            loader.hidden = true;
            MainContainer.hidden = false;
            break;
        
        default:
            break;
    }
}

async function RetrieveRandomPicture()
{
    try {
        SetLoader("loading");
        var response = await fetch(API_URL);
        picsArray = await response.json();
        InsertImages();
    } catch (error) {
        console.error("Oups: ", error);   
    }
    
}


function AttributesHelper(element, attributes)
{
    for (const key in attributes)
    {
        element.setAttribute(key, attributes[key]);
    }
}

function InsertImages()
{
    if (!MainContainer)
    {
        throw new error("Oups, check MainContainer Id!");
    }

    for (var i = 0; i < picsArray.length; i++)
    {
        var imageLink = picsArray[i].download_url;
        var author = picsArray[i].author;
        var link = picsArray[i].url;

        var aElement = document.createElement('a');
        AttributesHelper(aElement, {
            href: link,
            target: "_blank",
        });

        var imgElement = document.createElement('img');
        AttributesHelper(imgElement, {
            src: imageLink,
            alt: author,
            title: author,
        });

        aElement.appendChild(imgElement);

        MainContainer.appendChild(aElement);
    }



    SetLoader("completed");



}

window.addEventListener('scroll', (ev) => {
    count++;
    console.log(window.scrollY);
    console.log(window.innerHeight);
    console.log(document.body.offsetHeight);

    console.log(document.activeElement);
})

RetrieveRandomPicture();

