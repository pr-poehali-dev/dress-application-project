import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  category: string;
  sizes: string[];
  colors: string[];
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Спортивная футболка Pro', price: 2990, brand: 'Nike', category: 'tops', sizes: ['S', 'M', 'L', 'XL'], colors: ['white', 'black', 'orange'], image: 'https://cdn.poehali.dev/projects/70f00264-3848-4915-86ea-d3fc55fda836/files/b0bdf736-b863-4375-8d8e-496c1876731c.jpg' },
  { id: 2, name: 'Тренировочные брюки Elite', price: 4990, brand: 'Adidas', category: 'bottoms', sizes: ['M', 'L', 'XL'], colors: ['black', 'grey'], image: 'https://cdn.poehali.dev/projects/70f00264-3848-4915-86ea-d3fc55fda836/files/138a2b0b-6753-4c46-98ae-a88b7b1bf0e9.jpg' },
  { id: 3, name: 'Худи Performance', price: 5990, brand: 'Puma', category: 'tops', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['black', 'orange', 'grey'], image: 'https://cdn.poehali.dev/projects/70f00264-3848-4915-86ea-d3fc55fda836/files/b0bdf736-b863-4375-8d8e-496c1876731c.jpg' },
  { id: 4, name: 'Шорты Active Fit', price: 2490, brand: 'Nike', category: 'bottoms', sizes: ['S', 'M', 'L'], colors: ['black', 'white'], image: 'https://cdn.poehali.dev/projects/70f00264-3848-4915-86ea-d3fc55fda836/files/138a2b0b-6753-4c46-98ae-a88b7b1bf0e9.jpg' },
  { id: 5, name: 'Куртка Wind Runner', price: 7990, brand: 'Nike', category: 'outerwear', sizes: ['M', 'L', 'XL'], colors: ['black', 'orange'], image: 'https://cdn.poehali.dev/projects/70f00264-3848-4915-86ea-d3fc55fda836/files/b0bdf736-b863-4375-8d8e-496c1876731c.jpg' },
  { id: 6, name: 'Леггинсы Compression', price: 3490, brand: 'Adidas', category: 'bottoms', sizes: ['XS', 'S', 'M', 'L'], colors: ['black', 'grey'], image: 'https://cdn.poehali.dev/projects/70f00264-3848-4915-86ea-d3fc55fda836/files/138a2b0b-6753-4c46-98ae-a88b7b1bf0e9.jpg' },
  { id: 7, name: 'Топ спортивный Energy', price: 1990, brand: 'Puma', category: 'tops', sizes: ['XS', 'S', 'M', 'L'], colors: ['white', 'orange'], image: 'https://cdn.poehali.dev/projects/70f00264-3848-4915-86ea-d3fc55fda836/files/b0bdf736-b863-4375-8d8e-496c1876731c.jpg' },
  { id: 8, name: 'Костюм Track Suit', price: 8990, brand: 'Adidas', category: 'sets', sizes: ['S', 'M', 'L', 'XL'], colors: ['black', 'grey', 'white'], image: 'https://cdn.poehali.dev/projects/70f00264-3848-4915-86ea-d3fc55fda836/files/138a2b0b-6753-4c46-98ae-a88b7b1bf0e9.jpg' }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const allBrands = ['Nike', 'Adidas', 'Puma'];
  const allColors = [
    { name: 'black', label: 'Чёрный', hex: '#000000' },
    { name: 'white', label: 'Белый', hex: '#FFFFFF' },
    { name: 'grey', label: 'Серый', hex: '#9CA3AF' },
    { name: 'orange', label: 'Оранжевый', hex: '#FF4500' }
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSize = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesColor = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color));
    return matchesSearch && matchesPrice && matchesSize && matchesBrand && matchesColor;
  });

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
  };

  const resetFilters = () => {
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 10000]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary via-secondary to-black text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Zap" size={32} className="text-primary-foreground" />
              <h1 className="text-2xl font-heading font-bold">SPORTSWEAR STORE</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative hover:bg-white/20">
                <Icon name="ShoppingCart" size={24} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Icon name="User" size={24} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {[
              { id: 'catalog', icon: 'Grid3x3', label: 'Каталог' },
              { id: 'new', icon: 'Sparkles', label: 'Новинки' },
              { id: 'sales', icon: 'Percent', label: 'Акции' },
              { id: 'sizes', icon: 'Ruler', label: 'Размеры' },
              { id: 'profile', icon: 'User', label: 'Профиль' }
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Icon name={tab.icon as any} size={18} />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative flex-1 w-full">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Icon name="SlidersHorizontal" size={20} className="mr-2" />
                    Фильтры
                    {(selectedSizes.length > 0 || selectedBrands.length > 0 || selectedColors.length > 0) && (
                      <Badge className="ml-2 bg-primary text-primary-foreground">
                        {selectedSizes.length + selectedBrands.length + selectedColors.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="font-heading">Фильтры</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-heading font-semibold">Цена</h3>
                        <span className="text-sm text-muted-foreground">
                          {priceRange[0]} ₽ - {priceRange[1]} ₽
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={10000}
                        step={100}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-2"
                      />
                    </div>

                    <div>
                      <h3 className="font-heading font-semibold mb-4">Размер</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {allSizes.map((size) => (
                          <Button
                            key={size}
                            variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => toggleSize(size)}
                            className="font-medium"
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading font-semibold mb-4">Бренд</h3>
                      <div className="space-y-3">
                        {allBrands.map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                              id={brand}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={() => toggleBrand(brand)}
                            />
                            <label htmlFor={brand} className="text-sm cursor-pointer">
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading font-semibold mb-4">Цвет</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {allColors.map((color) => (
                          <Button
                            key={color.name}
                            variant={selectedColors.includes(color.name) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => toggleColor(color.name)}
                            className="justify-start gap-2"
                          >
                            <div
                              className="w-4 h-4 rounded-full border-2"
                              style={{ backgroundColor: color.hex, borderColor: color.hex === '#FFFFFF' ? '#e5e7eb' : color.hex }}
                            />
                            {color.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={resetFilters}
                    >
                      <Icon name="RotateCcw" size={18} className="mr-2" />
                      Сбросить фильтры
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-2 hover:border-primary hover:shadow-xl transition-all duration-300 animate-fade-in"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        {product.brand}
                      </Badge>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-heading font-semibold text-lg line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        {product.colors.slice(0, 3).map((color) => {
                          const colorData = allColors.find(c => c.name === color);
                          return (
                            <div
                              key={color}
                              className="w-5 h-5 rounded-full border-2"
                              style={{ 
                                backgroundColor: colorData?.hex,
                                borderColor: color === 'white' ? '#e5e7eb' : colorData?.hex
                              }}
                              title={colorData?.label}
                            />
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-heading font-bold text-primary">
                          {product.price.toLocaleString()} ₽
                        </span>
                        <Button
                          size="icon"
                          onClick={() => addToCart(product.id)}
                          className="rounded-full hover:scale-110 transition-transform"
                        >
                          <Icon name="ShoppingBag" size={20} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground mb-4">Попробуйте изменить параметры поиска или фильтры</p>
                <Button variant="outline" onClick={resetFilters}>
                  <Icon name="RotateCcw" size={18} className="mr-2" />
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'new' && (
          <div className="text-center py-16">
            <Icon name="Sparkles" size={64} className="mx-auto text-primary mb-4" />
            <h2 className="font-heading text-3xl font-bold mb-2">Новинки</h2>
            <p className="text-muted-foreground">Скоро здесь появятся новые товары</p>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="text-center py-16">
            <Icon name="Percent" size={64} className="mx-auto text-primary mb-4" />
            <h2 className="font-heading text-3xl font-bold mb-2">Акции</h2>
            <p className="text-muted-foreground">Следите за выгодными предложениями</p>
          </div>
        )}

        {activeTab === 'sizes' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <Icon name="Ruler" size={64} className="mx-auto text-primary mb-4" />
              <h2 className="font-heading text-3xl font-bold mb-2">Таблица размеров</h2>
              <p className="text-muted-foreground">Выберите правильный размер для максимального комфорта</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-heading font-semibold">Размер</th>
                        <th className="text-left py-3 font-heading font-semibold">Грудь (см)</th>
                        <th className="text-left py-3 font-heading font-semibold">Талия (см)</th>
                        <th className="text-left py-3 font-heading font-semibold">Бёдра (см)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: 'XS', chest: '84-88', waist: '64-68', hips: '88-92' },
                        { size: 'S', chest: '88-92', waist: '68-72', hips: '92-96' },
                        { size: 'M', chest: '92-96', waist: '72-76', hips: '96-100' },
                        { size: 'L', chest: '96-100', waist: '76-80', hips: '100-104' },
                        { size: 'XL', chest: '100-104', waist: '80-84', hips: '104-108' },
                        { size: 'XXL', chest: '104-108', waist: '84-88', hips: '108-112' }
                      ].map((row) => (
                        <tr key={row.size} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-3 font-semibold">{row.size}</td>
                          <td className="py-3">{row.chest}</td>
                          <td className="py-3">{row.waist}</td>
                          <td className="py-3">{row.hips}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-center py-16">
            <Icon name="User" size={64} className="mx-auto text-primary mb-4" />
            <h2 className="font-heading text-3xl font-bold mb-2">Профиль</h2>
            <p className="text-muted-foreground mb-6">Войдите, чтобы отслеживать заказы и управлять аккаунтом</p>
            <Button size="lg" className="font-heading">
              <Icon name="LogIn" size={20} className="mr-2" />
              Войти
            </Button>
          </div>
        )}
      </main>

      <footer className="bg-secondary text-secondary-foreground mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading font-semibold text-lg mb-2">SPORTSWEAR STORE</p>
          <p className="text-sm opacity-80">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}