import User from "../models/User.js";

class UserRepository {
  constructor() {
    this.model = User;
  }

  async create(data) {
    const user = await this.model.create(data);

    return user;
  }

  async update(id, data) {
    const updatedUser = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return updatedUser;
  }

  async findByUsername(name) {
    const user = await this.model
      .findOne({ username: name })
      .select("password");

    return user;
  }

  async getAll(queryParams) {
    let queryCpy = { ...queryParams };

    const queries = ["select", "sort", "page", "limit"];

    Object.keys(queryCpy).forEach((key) => {
      if (queries.includes(key)) {
        delete queryCpy[key];
      }
    });

    let query;

    let countQuery;

    query = this.model.find(queryCpy);

     countQuery = this.model.find(queryCpy);

    if (queryParams["sort"]) {
      const sortKeys = queryParams["sort"].split(",");

      let sortObj = {};

      sortKeys.forEach((key) => {
        if (key.startsWith("-")) {
          sortObj[key.substring(1)] = -1;
        } else {
          sortObj[key] = 1;
        }
      });

      query = query.sort(sortObj);

      countQuery = countQuery.sort(sortObj)
    }

    let page = queryParams["page"] ? parseInt(queryParams["page"]) : 1;

    let limit = queryParams["limit"] ? parseInt(queryParams["limit"]) : 20;

    let pagination = {};

    let totalDocuments = await countQuery.countDocuments();

    let skipDocuments = (page - 1) * limit;

    let nextDocuments = totalDocuments - skipDocuments;

    let totalPages = Math.ceil(totalDocuments / limit);

    if (nextDocuments > 0) {
      let current = {
        page,
        size: Math.min(nextDocuments, limit),
      };

      pagination.current = current;
    }

    let leftDocuments = nextDocuments - limit;

    if (leftDocuments > 0) {
      let next = {
        page: page + 1,
        size: Math.min(limit, leftDocuments),
      };

      pagination.next = next;
    }

    //prev page

    if (pagination.current?.size > 0) {
      if (page > 1) {
        let prev = {
          page: page - 1,
          size: limit,
        };

        pagination.prev = prev;
      }
    }

    if (queryParams["select"]) {
      let selectStr = queryParams["select"].split(",").join(" ");

      query = query.select(selectStr);
    }

    let users = await query;

    return {
      count: Math.max(0, nextDocuments),

      pagination,

      users,
    };
  }
}

export default UserRepository;
