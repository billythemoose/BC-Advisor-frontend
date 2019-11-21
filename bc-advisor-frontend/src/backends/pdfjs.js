export default class PDFJs{
    init=(source, element) =>{
        const textNode=document.createElement('p');
        textNode.innerHTML= 'Transcript:${source}';
        element.appendChild(textNode);
    }
}