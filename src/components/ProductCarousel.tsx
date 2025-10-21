import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import lettuceImg from "@/assets/product-lettuce.jpg";
import spinachImg from "@/assets/product-spinach.jpg";
import herbsImg from "@/assets/product-herbs.jpg";

const products = [
  {
    name: "Hydroponic Lettuce",
    description: "Fresh, crisp lettuce grown using NFT system",
    image: lettuceImg,
  },
  {
    name: "Organic Spinach",
    description: "Nutrient-rich spinach for healthy living",
    image: spinachImg,
  },
  {
    name: "Fresh Herbs",
    description: "Basil, mint, cilantro and more",
    image: herbsImg,
  },
];

const ProductCarousel = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Our Fresh Produce
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the variety of vegetables and herbs you can grow with our hydroponic systems
          </p>
        </div>
        
        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all duration-300 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{product.name}</h3>
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
