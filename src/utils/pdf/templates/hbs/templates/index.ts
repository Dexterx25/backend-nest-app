export const divComponent = '<div id="_id" class="_class_name" style="_style">_child</div>'   
export const imageComponent = '<img style="_style" class="_class_name" src="_src" />'
export const paraphComponent = '<p style="_style" class="_class_name">_child</p>'
export const titleComponent = '<h2 style="_style" class="_class_name" >_child</h2>'
export const titleCustom = '<_type style="_style" class="_class_name" >_child</_type>'
export const elementsContent = ['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'title', 'h6', 'p', 'div' , 'section']
export const importantCustomTitleComponent = (number?:number, text?:string, style?:string) => {
    return `<h${number} style="${style}">${text}</h${number}>`
}
