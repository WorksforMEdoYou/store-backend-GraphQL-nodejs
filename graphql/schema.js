const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLID, GraphQLBoolean } = require('graphql');
const User = require('../models/User');
const Product = require('../models/Product');
const ProductReview = require('../models/ProductReview');
const Dealer = require('../models/Deler');

// User Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    address: { type: GraphQLString },
  },
});

// Product Type
const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: GraphQLID },
    product_image: { type: GraphQLString },
    product_name: { type: GraphQLString },
    product_price: { type: GraphQLFloat },
    product_description: { type: GraphQLString },
    product_discount: { type: GraphQLFloat },
    product_review: { type: new GraphQLList(GraphQLID) }, // References ProductReview
  },
});

// Product Review Type
const ProductReviewType = new GraphQLObjectType({
  name: 'ProductReview',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    isAuthenticated: { type: GraphQLBoolean },
    product_name: { type: GraphQLString },
    review: { type: GraphQLString },
    comment: { type: GraphQLString },
  },
});

// Dealer Type
const DealerType = new GraphQLObjectType({
  name: 'Dealer',
  fields: {
    id: { type: GraphQLID },
    company_name: { type: GraphQLString },
    dealer_name: { type: GraphQLString },
    date_of_buyed: { type: GraphQLString },
    qty: { type: GraphQLInt },
    unit_price: { type: GraphQLFloat },
  },
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find();
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find();
      },
    },
    productReviews: {
      type: new GraphQLList(ProductReviewType),
      resolve() {
        return ProductReview.find();
      },
    },
    dealers: {
      type: new GraphQLList(DealerType),
      resolve() {
        return Dealer.find();
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add User
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve(_, args) {
        const user = new User({
          username: args.username,
          email: args.email,
          password: args.password,
          address: args.address,
        });
        return user.save();
      },
    },
    //update User
    updateUser: {
        type: UserType,
        args: {
          id: { type: GraphQLID }, // User ID to identify which user to update
          username: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
          address: { type: GraphQLString },
        },
        resolve(_, args) {
          return User.findByIdAndUpdate(
            args.id,
            {
              username: args.username,
              email: args.email,
              password: args.password,
              address: args.address,
            },
            { new: true } // Return the updated document
          );
        },
      },

    // Delete User
    deleteUser: {
        type: UserType,
        args: {
          id: { type: GraphQLID }, // User ID to identify which user to delete
        },
        resolve(_, args) {
          return User.findByIdAndRemove(args.id);
        },
      },      

    // Add Product
    addProduct: {
      type: ProductType,
      args: {
        product_image: { type: GraphQLString },
        product_name: { type: GraphQLString },
        product_price: { type: GraphQLFloat },
        product_description: { type: GraphQLString },
        product_discount: { type: GraphQLFloat },
      },
      resolve(_, args) {
        const product = new Product({
          product_image: args.product_image,
          product_name: args.product_name,
          product_price: args.product_price,
          product_description: args.product_description,
          product_discount: args.product_discount,
        });
        return product.save();
      },
    },
    
    //update Product
    updateProduct: {
        type: ProductType,
        args: {
          id: { type: GraphQLID }, // Product ID to identify which product to update
          product_image: { type: GraphQLString },
          product_name: { type: GraphQLString },
          product_price: { type: GraphQLFloat },
          product_description: { type: GraphQLString },
          product_discount: { type: GraphQLFloat },
        },
        resolve(_, args) {
          return Product.findByIdAndUpdate(
            args.id,
            {
              product_image: args.product_image,
              product_name: args.product_name,
              product_price: args.product_price,
              product_description: args.product_description,
              product_discount: args.product_discount,
            },
            { new: true }
          );
        },
    },
      
    // Delete Product
    deleteProduct: {
        type: ProductType,
        args: {
          id: { type: GraphQLID }, // Product ID to identify which product to delete
        },
        resolve(_, args) {
          return Product.findByIdAndRemove(args.id);
        },
    },
      
    // Add Product Review
    addProductReview: {
      type: ProductReviewType,
      args: {
        username: { type: GraphQLString },
        isAuthenticated: { type: GraphQLBoolean },
        product_name: { type: GraphQLString },
        review: { type: GraphQLString },
        comment: { type: GraphQLString },
      },
      resolve(_, args) {
        const review = new ProductReview({
          username: args.username,
          isAuthenticated: args.isAuthenticated,
          product_name: args.product_name,
          review: args.review,
          comment: args.comment,
        });
        return review.save();
      },
    },

    //update Product Review
    updateProductReview: {
        type: ProductReviewType,
        args: {
          id: { type: GraphQLID },
          username: { type: GraphQLString },
          isAuthenticated: { type: GraphQLBoolean },
          product_name: { type: GraphQLString },
          review: { type: GraphQLString },
          comment: { type: GraphQLString },
        },
        resolve(_, args) {
          return ProductReview.findByIdAndUpdate(
            args.id,
            {
              username: args.username,
              isAuthenticated: args.isAuthenticated,
              product_name: args.product_name,
              review: args.review,
              comment: args.comment,
            },
            { new: true }
          );
        },
    },
      
    // Delete Product Review
    deleteProductReview: {
        type: ProductReviewType,
        args: {
          id: { type: GraphQLID },
        },
        resolve(_, args) {
          return ProductReview.findByIdAndRemove(args.id);
        }
    },

    // Add Dealer
    addDealer: {
      type: DealerType,
      args: {
        company_name: { type: GraphQLString },
        dealer_name: { type: GraphQLString },
        date_of_buyed: { type: GraphQLString },
        qty: { type: GraphQLInt },
        unit_price: { type: GraphQLFloat },
      },
      resolve(_, args) {
        const dealer = new Dealer({
          company_name: args.company_name,
          dealer_name: args.dealer_name,
          date_of_buyed: new Date(args.date_of_buyed),
          qty: args.qty,
          unit_price: args.unit_price,
        });
        return dealer.save();
      },
    },

    //update Dealer
    updateDealer: {
        type: DealerType,
        args: {
            id: { type: GraphQLID },
            company_name: { type: GraphQLString },
            dealer_name: { type: GraphQLString },
            date_of_buyed: { type: GraphQLString },
            qty: { type: GraphQLInt },
            unit_price: { type: GraphQLFloat },
            },
        resolve(_, args) {
            return Dealer.findByIdAndUpdate(args.id, {
                company_name: args.company_name,
                dealer_name: args.dealer_name,
                date_of_buyed: new Date(args.date_of_buyed),
                qty: args.qty,
                unit_price: args.unit_price,
            });
        }
    },

    // Delete Dealer
    deleteDealer: {
        type: DealerType,
        args: {
            id: { type: GraphQLID },
            },
        resolve(_, args) {
            return Dealer.findByIdAndRemove(args.id);
        }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
