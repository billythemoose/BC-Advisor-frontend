export default class PDFJs{
    init=(source, element) =>{
        const textNode=document.createElement('p');
        textNode.innerHTML= 'Our Transcript Source will be: ${source}';
        element.appendChild(textNode);


    }
}