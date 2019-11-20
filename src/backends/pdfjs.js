export default class PDFJs{
    init=(source, element) =>{
        const textNode=document.createElement('p');
        textNode.innerHTML= 'Our PDF Source will be: ${source}';
        element.appendChild(textNode);


    }
}