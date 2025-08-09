
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CodingProfiles = () => {
  const profiles = [
    {
      name: 'LeetCode',
      description: 'Algorithm and data structure challenges',
      stats: '500+ Problems Solved',
      rating: 'Expert Level',
      color: 'from-orange-500 to-yellow-500',
      url: 'https://leetcode.com'
    },
    {
      name: 'HackerRank',
      description: 'Programming contests and skill assessments',
      stats: '5⭐ in Problem Solving',
      rating: '2000+ Points',
      color: 'from-green-500 to-emerald-500',
      url: 'https://hackerrank.com'
    },
    {
      name: 'Codeforces',
      description: 'Competitive programming platform',
      stats: 'Specialist Rank',
      rating: '1400+ Rating',
      color: 'from-blue-500 to-cyan-500',
      url: 'https://codeforces.com'
    },
    {
      name: 'CodeChef',
      description: 'Monthly programming contests',
      stats: '3⭐ Coder',
      rating: '1600+ Rating',
      color: 'from-purple-500 to-pink-500',
      url: 'https://codechef.com'
    },
    {
      name: 'GitHub',
      description: 'Open source contributions',
      stats: '200+ Repositories',
      rating: '1000+ Contributions',
      color: 'from-gray-700 to-gray-900',
      url: 'https://github.com'
    },
    {
      name: 'Stack Overflow',
      description: 'Community Q&A platform',
      stats: '5K+ Reputation',
      rating: 'Top 10% Developer',
      color: 'from-orange-600 to-red-600',
      url: 'https://stackoverflow.com'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
            Coding Profiles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey across different competitive programming platforms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, y: 50, rotateY: -90 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -10, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group perspective-1000"
            >
              <Card className="h-full backdrop-blur-sm bg-card/50 border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 transform-gpu">
                <div className={`h-32 bg-gradient-to-br ${profile.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-8 h-8 border-2 border-white/30 rounded-full border-t-white"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white">{profile.name}</h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    {profile.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Performance:</span>
                      <span className="text-sm text-primary font-semibold">{profile.stats}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Rating:</span>
                      <span className="text-sm text-accent font-semibold">{profile.rating}</span>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full group/btn">
                    <a href={profile.url} target="_blank" rel="noopener noreferrer">
                      Visit Profile
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodingProfiles;
