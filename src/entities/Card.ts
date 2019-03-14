interface Images {
    svg: string,
    png: string
}

export interface CardEntity {
    value: string | number,
    images: Images,
    suit: string,
    image: string,
    code: string
}