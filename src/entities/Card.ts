interface Images {
    svg: string,
    png: string
}

export interface CardEntity {
    value: string,
    images: Images,
    suit: string,
    image: string,
    code: string
}