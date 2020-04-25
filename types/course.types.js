module.exports = `
    type Course{
        id: ID!
        title: String!
        views: Int
        description: String
        user: User
    }

    input CourseInput{
        title: String!
        views: Int
        description: String
    }

    extend type Query{
        getCourses(page: Int, limit: Int = 5): [Course]
        getCourse(id: ID!): Course 
    }

    extend type Mutation {
        addCourse(input: CourseInput, user: ID!): Course
        editCourse(id: ID!, input: CourseInput): Course
        deleteCourse(id: ID!): Alert
    }
`