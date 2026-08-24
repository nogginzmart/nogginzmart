//the header of the site would be handled in this javascript file, so you don't have to copypaste the whole thing onto every page.
//at the bottom of your page, but before the js script calls and the closing body tag, put an empty div with a class of "writeHeader"
document.querySelector(".writeHeader").innerHTML = `
    <header align="center">
        <a href="comics.html"><img src="./img/logo.png" alt="" /></a> 

        <div id="nav">
            <a href="DTTKIFcomic.html">COMICS HOME</a> |
            <a href="index.html">WEBSITE HOME</a> |
            <a href="DTTKIFarchive.html">ARCHIVE</a> |
            <a href="https://nogginzmart.neocities.org/DTTKIF">ABOUT</a> |
            <a href="DTTKIFcharacters.html">CHARACTERS</a>
        </div>
    </header>
`;
