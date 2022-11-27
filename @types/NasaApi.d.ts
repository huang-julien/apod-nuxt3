export {};

declare global {
/**
 * Apod request query
 */
 interface ApodQuery {
    date?: string,
    start_date?: string,
    end_date?: string,
    count?: number,
    thumbs?: boolean,
    api_key: string
}

/**
 * Apod request response
 * @see https://github.com/nasa/apod-api
 */
interface ApodResponse {
    resource?: {
        image_set?: string,
        planet?: string
    },
    /**
     * @deprecated in Apod
     */
    concept_tags?: boolean,
    title: string,
    /**
     * @type "YYY-MM-dd"
     */
    date: string,
    url: string,
    hdurl?: string,
    explanation: string,
    /**
    * @deprecated in Apod
    */
    concepts?: string[],
    media_type: 'image' | 'video'
    /**
     * if video
     */
    thumbnail_url?: string,
    copyright: string,
    service_version?: string
}

}