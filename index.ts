interface Article extends BaseContent {
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
}

interface BaseContent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'published' | 'archived';
}

interface Product extends BaseContent {
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

type ValidationResult = {
  isValid: boolean;
  errors?: string[];
};

type Role = 'admin' | 'editor' | 'viewer';
type Permission = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

type AccessControl<T extends BaseContent> = {
  role: Role;
  permissions: Permission;
  contentFilter?: (content: T) => boolean;
}

type ContentOperations<T extends BaseContent> = {
  create: (content: T) => T;
  read: (id: string) => T | undefined;
  update: (id: string, content: T) => T;
  delete: (id: string) => boolean;
}

type Validator<T> = {
  validate: (data: T) => ValidationResult;
};


function main() {
  // Імітація бази даних
  let articles: Article[] = [];
  let products: Product[] = [];
  
  // Імплементація операцій над статтями
  const articleOperations: ContentOperations<Article> = {
    create: (article: Article): Article => {
      articles.push(article);
      return article;
    },
    read: (id: string): Article | undefined => {
      return articles.find(article => article.id === id);
    },
    update: (id: string, article: Article): Article => {
      const index = articles.findIndex(a => a.id === id);
      if (index > -1) {
        articles[index] = { ...articles[index], ...article };
      }
      return articles[index];
    },
    delete: (id: string): boolean => {
      const index = articles.findIndex(a => a.id === id);
      if (index > -1) {
        articles.splice(index, 1);
        return true;
      }
      return false;
    }
  };
  
  // Створення статті
  const newArticle: Article = {
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
