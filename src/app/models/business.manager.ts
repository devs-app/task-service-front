import { PersonrModel } from "./person.model"

export interface BusinessManagerModel {
    companyId?: number
    person?: PersonrModel
    email?: string
}

