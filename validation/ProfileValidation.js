import { check} from "express-validator";

export const create = [
    check('profile_name').notEmpty().withMessage("Cannot be null"),
    check('contentRating').notEmpty().withMessage("Cannot be null"),
]