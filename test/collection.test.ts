import { Collection } from '../src'
import { Entity } from '../src/Entity'

class NumberCollection extends Collection {
    item(item: any): Number {
        return new Number(item)
    }
}

class PersonCollection extends Collection {
    item(item: any): Person {
        return new Person(item)
    }
}

class Person extends Entity<any> {
    [key: string]: any;
}

class Number {

    public item;

    constructor(item: number) {
        this.item = item
    }

    value() {
        return this.item
    }
}

test('test "count" method', () => {

    const collection = new NumberCollection([1, 2, 3, 4, 5])

    expect(collection.count()).toBe(5);
});

test('test collection iteration', () => {

    const collection = new NumberCollection([1, 2, 3, 4, 5])

    let value = 1

    for (const item of collection) {
        expect(item.value()).toBe(value)
        value++
    }

});

test('test "is empty" method', () => {

    let numbers = new NumberCollection([1, 2, 3, 4, 5])
    expect(numbers.isEmpty()).toBe(false)

    numbers = new NumberCollection([])
    expect(numbers.isEmpty()).toBe(true)
});

test('test "map" method', () => {

    let persons = new PersonCollection([{
        'name': 'rix'
    }, {
        'name': 'roger'
    }])

    const names = persons.map((person: Person) => {
        return person.name
    })

    expect(names.first()).toBe("rix")

});

test('test "first where" method', () => {

    let persons = new PersonCollection([{
        'name': 'rix'
    }, {
        'name': 'roger'
    }])

    const person = persons.firstWhere((person: Person) => {
        return person.name == "roger"
    })

    expect(person.name).toBe("roger")

});

test('test "whereIn" method', () => {

    let articles = new Collection([{
        title: 'First article',
        country: {
            city: 'Berlin'
        }
    }, {
        title: 'Second article',
        country: {
            city: 'Berlin'
        }
    }, {
        title: 'Third article',
        country: {
            city: 'London'
        }
    }])

    let otherArticles = new Collection(['First article', 'Second article'])

    const filteredArticles = articles.whereIn('title', otherArticles)

    expect(filteredArticles.count()).toBe(2)
    expect(articles.whereIn('country.city', ['Berlin', 'London']).count()).toBe(3)
    expect(articles.whereIn('country.city', ['Berlin']).count()).toBe(2)
    expect(articles.whereIn('country.city', ['Other']).count()).toBe(0)

    let numbers = new Collection([{
        item: 1
    }, {
        item: 2
    }, {
        item: 3
    }])
    let stringNumbers = new Collection([{
        item: '1'
    }, {
        item: '2'
    }, {
        item: '3'
    }])

    const filteredNumbers = numbers.whereIn('item', stringNumbers.pluck('item'))

    expect(filteredNumbers.count()).toBe(3)

    let otherNumbers = new Collection([{
        item: "one"
    }, {
        item: "two"
    }, {
        item: "three"
    }])
    let otherCasedNumbers = new Collection([{
        item: "ONE"
    }, {
        item: "Two"
    }, {
        item: "ThRee "
    }])

    const filteredOtherNumbers = otherNumbers.whereIn('item', otherCasedNumbers.pluck('item'))

    expect(filteredOtherNumbers.count()).toBe(2)
})

test('test "whereNotIn" method', () => {

    let articles = new Collection([{
        title: 'MIK-I: a portable low-cost platform for automated C–C bond synthesis',
    }, {
        title: 'Second article',
    }, {
        title: 'Third article',
    }])

    let otherArticles = new Collection(['Fourth article', 'MIK-I: a portable low-cost platform for automated C–C bond synthesis'])

    const filteredArticles = articles.whereNotIn('title', otherArticles)

    expect(filteredArticles.count()).toBe(2)

    let numbers = new Collection([{
        item: 1
    }, {
        item: 2
    }, {
        item: 3
    }])
    let stringNumbers = new Collection([{
        item: '1'
    }, {
        item: '4'
    }, {
        item: '5'
    }])

    const filteredNumbers = numbers.whereNotIn('item', stringNumbers.pluck('item'))

    expect(filteredNumbers.count()).toBe(2)

    let otherNumbers = new Collection([{
        item: "one"
    }, {
        item: "two"
    }, {
        item: "three"
    }])
    let otherCasedNumbers = new Collection([{
        item: "ONE"
    }, {
        item: "Two"
    }, {
        item: "ThRee "
    }])

    const filteredOtherNumbers = otherNumbers.whereNotIn('item', otherCasedNumbers.pluck('item'))

    expect(filteredOtherNumbers.count()).toBe(1)

    const newArticles = new Collection([{
        title: 'Advanced chemibold: A ludic approach to identify functional groups in organic chemistry',
    }, {
        title: 'Organic solar cells based on PM6:Y7 and doped with boron-dipyrromethene (B1)'
    }])

    const otherNewArticles = new Collection([
        'Organic solar cells based on PM6:Y7 and doped with boron-dipyrromethene (B1)',
        'Advanced Chemibold: A Ludic Approach to Identify Functional Groups in Organic Chemistry'
    ])

    const filteredNewArticles = newArticles.whereNotIn('title', otherNewArticles)

    expect(filteredNewArticles.count()).toBe(0)
})

test('test "is array" method', () => {

    let collection = new Collection([])

    expect(Array.isArray(collection.toArray())).toBe(true)
})

test('test "from json" method', () => {

    let collection = Collection.fromJson("[1,2,3]")

    expect(collection.count()).toBe(3)
})

test('test "clone" method', () => {

    let collection = new Collection([1, 2, 3])
    let collectionClone = collection.clone()

    expect(collectionClone.count()).toBe(collection.count())
})

test('test "filter" method', () => {

    let collection = new Collection([1, 2, 3])

    let newCollection = collection.filter((item: number) => {
        return item <= 2
    })

    expect(newCollection.count()).toBe(2)
})

test('test "contains" method', () => {

    const collection = new Collection([1, 2, 3])

    const containsThree = collection.contains((item: number) => {
        return item == 3
    })

    expect(containsThree).toBe(true)

    const containsFour = collection.contains((item: number) => {
        return item == 4
    })

    expect(containsFour).toBe(false)
})

test('test "get" method', () => {

    const collection = new Collection([1, 2, 3])

    const two = collection.get(1)

    expect(two).toBe(2)
})

test('test "push" method', () => {

    const collection = new Collection([1, 2, 3])

    collection.push(4)

    expect(collection.count()).toBe(4)
})

test('test "pop" method', () => {

    const collection = new Collection([1, 2, 3])

    const three = collection.pop()

    expect(three).toBe(3)

    expect(collection.count()).toBe(2)
})

test('test "concat" method', () => {

    const collection = new Collection([1, 2, 3])

    collection.concat([4, 5, 6])

    expect(collection.count()).toBe(6)

})

test('test "random" method', () => {

    const collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])

    const firstNumber = collection.random()
    const secondNumber = collection.random()

    expect(typeof firstNumber).toBe("number")
    expect(firstNumber === secondNumber).toBe(false)

})


test('test "where" method', () => {
    let persons = new PersonCollection([{
        'name': 'rix',
        "publications": {
            "approved": 14
        },
        'address': {
            'street': 'Santo Domingo'
        }
    }, {
        'name': 'roger',
        'publications': {
            'approved': 12
        }
    }])

    const person = persons.where("name", "rix").first()

    expect(person.name).toBe("rix")

    const person2 = persons.where("name", "rix").where("address.street", "Santo Domingo").first()

    expect(person2.name).toBe("rix")

    const person3 = persons.where("address.road", "Santo Domingo").first()

    expect(person3).toBe(null)

    const person4 = persons.where((person: Person) => {
        return person?.address?.street == "Santo Domingo"
    }).first();

    expect(person4.name).toBe("rix")

    expect(persons.where("publications.approved", ">=", 13).count()).toBe(1)
})

test('test "array" method', () => {

    const items = [{
        'name': 'rix'
    }, {
        'name': 'roger'
    }]

    const iterable = {
        items: items,
        links: {
            next: null,
            prev: null,
            self: null,
        }
    }

    let persons = new PersonCollection(iterable)

    expect(Array.isArray(persons.toArray())).toBe(true)
})

test('test "pluck" method', () => {
    let persons = new PersonCollection([{
        'name': 'rix',
        'age': 25,
        'city': 'berlin'
    }, {
        'name': 'roger',
        'age': 30,
        'city': 'berlin'
    }])

    expect(persons.pluck('name').first()).toBe('rix');
    expect(persons.pluck('name', 'age').first().age).toBe(25);
    expect(persons.pluck('name', 'city').first().age).toBe(undefined);
    expect(persons.pluck('name', 'unexistent').first().unexistent).toBe(undefined);
})

test('test "sortBy" method', () => {

    let persons = new PersonCollection([{
        'name': 'rix',
        'age': 25,
        'points': 100
    }, {
        'name': 'roger',
        'age': 17,
        'points': 200
    }])

    expect(persons.sortBy('age').first().name).toBe('roger')
    expect(persons.sortBy('points', 'desc').first().name).toBe('roger')

})

test('test "sum" method', () => {

    const collection = new Collection([
        {
            alumno: {
                calificaciones: {
                    promedio: 8.5
                }
            },
            edad: 17
        },
        {
            alumno: {
                calificaciones: {
                    promedio: 9.2
                }
            },
            edad: 18
        }
    ]);

    const promedio = collection.sum('alumno.calificaciones.promedio');

    expect(promedio).toBe(17.7)
    expect(collection.sum('edad')).toBe(35)

})

test('test "unique" method', () => {
    let persons = new PersonCollection([{
        'name': 'rix',
        'age': 25
    }, {
        'name': 'rix',
        'age': 25
    }, {
        'name': 'rix',
        'age': 25
    }, {
        'name': 'roger',
        'age': 30
    }])

    expect(persons.count()).toBe(4);

    expect(persons.unique().count()).toBe(2);
})

test('test "orderBy" method', () => {
    let persons = new PersonCollection([{
        'name': 'rix',
        'age': 25,
        'birthday': '1989-01-01'
    }, {
        'name': 'roger',
        'age': 30,
        'birthday': '1999-12-12'
    }])

    expect(persons.orderBy('age').first().name).toBe('rix')
    expect(persons.orderBy('age', 'desc').first().name).toBe('roger')
    expect(persons.orderBy('birthday').first().name).toBe('rix')
    expect(persons.orderBy('birthday', 'desc').first().name).toBe('roger')
})

test('test "min" method', () => {
    let persons = new PersonCollection([{
        'name': 'rix',
        'age': 25,
        'birthday': '1989-01-01'
    }, {
        'name': 'roger',
        'age': 30,
        'birthday': '1999-12-12'
    }])

    expect(persons.min('age').name).toBe('rix')
    expect(persons.min('birthday').name).toBe('rix')
    expect(persons.min('name').name).toBe('rix')
    expect(persons.min('other')).toBe(null)
})