"use strict";
function main() {
    // Імітація бази даних
    let articles = [];
    let products = [];
    // Імплементація операцій над статтями
    const articleOperations = {
        create: (article) => {
            articles.push(article);
            return article;
        },
        read: (id) => {
            return articles.find(article => article.id === id);
        },
        update: (id, article) => {
            const index = articles.findIndex(a => a.id === id);
            if (index > -1) {
                articles[index] = Object.assign(Object.assign({}, articles[index]), article);
            }
            return articles[index];
        },
        delete: (id) => {
            const index = articles.findIndex(a => a.id === id);
            if (index > -1) {
                articles.splice(index, 1);
                return true;
            }
            return false;
        }
    };
    // Створення статті
    const newArticle = {
        id: '101',
        title: 'Стаття про TypeScript Generics',
        content: 'Ця стаття охоплює основи використання TypeScript Generics та їхні варіанти використання.',
        authorId: 'author42',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft'
    };
    // Додавання статті в систему
    articleOperations.create(newArticle);
    // Читання статті
    const readArticle = articleOperations.read('101');
    console.log('Прочитана стаття:', readArticle);
    // Оновлення статті
    if (readArticle) {
        readArticle.title = 'Оновлена стаття про TypeScript Generics';
        readArticle.content = 'Оновлена стаття тепер включає розширені варіанти використання TypeScript Generics.';
        articleOperations.update(readArticle.id, readArticle);
        console.log('Оновлена стаття:', articleOperations.read('101'));
    }
    // Видалення статті
    console.log('Видалення статті:', articleOperations.delete('101'));
    // Виведення стану "бази даних" статей
    console.log('Статті:', articles);
}
main();
