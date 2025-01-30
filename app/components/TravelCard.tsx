'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TravelCard, TravelCardProps } from '@/types/travel';

export default function TravelCard({ image, title, description }: TravelCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group h-[500px] overflow-hidden">
      <Card 
        className="relative h-96 w-full overflow-hidden transition-transform duration-500 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-full">
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              width={236}
              height={334}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="absolute inset-0 bg-black/20 flex items-start p-6">
            <h3 className="text-white text-lg font-thin">{title}</h3>
          </div>

          <div
            className={`bg-[#FAF7F2] absolute top-0 right-0 h-full w-2/3 bg-white/95 p-6 transform transition-transform duration-500 ease-in-out ${
              isHovered ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="bg-[#FAF7F2] h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-light mb-4">{title}</h3>
                <p className="text-gray-600 text-xs">{description}</p>
              </div>
              <Button variant="explore" className="w-full font-light rounded-none">
                Start exploring
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};