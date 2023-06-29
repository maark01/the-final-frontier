import { motion } from "framer-motion"
const motionConfig = require("../../assets/motion.json")

export default function CustomMotion(props) {
    return (
        <motion.div
            initial={motionConfig.initial}
            animate={motionConfig.animate}
            exit={motionConfig.exit}
            transition={motionConfig.transition}
            {...props}
        >
            {props.children}
        </motion.div>
    )
}